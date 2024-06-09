import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const where = {};

    if (query.city) {
      where.city = query.city;
    }

    if (query.category) {
      where.category = query.category;
    }

    if (query.startDate && !isNaN(Date.parse(query.startDate))) {
      where.startDate = {
        gte: new Date(query.startDate),
      };
    }

    if (query.query) {
      const search = query.query;
      where.OR = [
        { city: { contains: search, mode: "insensitive" } },
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
        { country: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
      ];
    }

    const posts = await prisma.volunteerPost.findMany({
      where: where,
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          for (let i = 0; i < posts.length; i++) {
            const postId = posts[i].id;
            const saved = await prisma.savedPost.findUnique({
              where: {
                userId_postId: {
                  postId,
                  userId: payload.Id,
                },
              },
            });
            posts[i].isSaved = saved ? true : false;
          }
        }
        res.status(200).json(posts);
      });
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.volunteerPost.findUnique({
      where: { id },
      include: {
        volunteerPostDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.Id,
              },
            },
          });
          res.status(200).json({ ...post, isSaved: saved ? true : false });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const { title, ...body } = req.body;
  const tokenUserId = req.userId;
  try {
    const newPost = await prisma.volunteerPost.create({
      data: {
        title,
        ...body,
        userId: tokenUserId,
        volunteerPostDetail: {
          create: body.volunteerPostDetail,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const volunteerPost = await prisma.volunteerPost.findUnique({
      where: { id },
    });
    if (volunteerPost.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    const updatedPost = await prisma.volunteerPost.update({
      where: { id },
      data: {
        ...req.body,
        volunteerPostDetail: {
          update: {
            ...req.body.volunteerPostDetail,
          },
        },
      },
    });
    if (!updatedPost) {
      return res.status(500).json({ message: "Failed to update post" });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.volunteerPost.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.volunteerPostDetail.delete({
      where: { postId: id },
    });

    await prisma.volunteerPost.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
