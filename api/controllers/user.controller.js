import { re } from "mathjs";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
export const getUsers = async (req, res) => {
  console.log("getUsers");
  const users = await prisma.user.findMany();
  res.status(200).json(users);
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({ where: { id } });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const tokenId = req.userId;
    const { password, ...data } = req.body;

    if (id !== tokenId) {
      return res
        .status(403)
        .json({ message: "You can only update your own account" });
    }

    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const tokenId = req.userId;

    if (id !== tokenId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own account" });
    }
    const userToDelete = await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const savePost = async (req, res) => {
  const postId = req.query.postId;
  const tokenUserId = req.userId;
  console.log("post id is", postId);
  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });

    console.log("saved post is", savedPost);

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      res.status(200).json({ message: "Post removed from saved list" });
    } else {
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      });
      res.status(200).json({ message: "Post saved" });
    }
    // res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to save/unsave post" });
  }
};

// export const profilePosts = async (req, res) => {
//   const tokenUserId = req.userId;
//   console.log("userid issssssssss " + tokenUserId);
//   try {
//     const userPosts = await prisma.volunteerPost.findMany({
//       where: { userId: tokenUserId },
//     });
//     const saved = await prisma.savedPost.findMany({
//       where: { userId: tokenUserId },
//       include: {
//         volunteerPost: true,
//       },
//     });

//     const savedPosts = saved.map((item) => item.volunteerPost);
//     res.status(200).json({ userPosts, savedPosts });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to get profile Posts" });
//   }
// };

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;
  console.log("userid is " + tokenUserId);

  try {
    // Fetch user posts
    const userPosts = await prisma.volunteerPost.findMany({
      where: { userId: tokenUserId },
    });

    // Fetch saved posts by the user, including the full post details
    const savedPostsData = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        volunteerPost: true,
      },
    });

    // Extract saved posts from savedPostsData and set isSaved to true
    const savedPosts = savedPostsData.map((item) => ({
      ...item.volunteerPost,
      isSaved: true,
    }));

    // Create a Set of saved post IDs for quick lookup
    const savedPostIds = new Set(savedPosts.map((post) => post.id));

    // Add isSaved flag to each user post
    const userPostsWithIsSaved = userPosts.map((post) => ({
      ...post,
      isSaved: savedPostIds.has(post.id),
    }));

    // Respond with userPosts with isSaved flag and the savedPosts
    res.status(200).json({ userPosts: userPostsWithIsSaved, savedPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts" });
  }
};
