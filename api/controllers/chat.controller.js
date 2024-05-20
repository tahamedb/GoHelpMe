import { lgamma } from "mathjs";
import prisma from "../lib/prisma.js";
export const getChats = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        usersId: {
          hasSome: [tokenUserId],
        },
      },
    });
    for (const chat of chats) {
      // console.log(chat);
      const receiverId = chat.usersId.find((id) => id !== tokenUserId);
      const receiver = await prisma.user.findUnique({
        where: { id: receiverId },
        select: { id: true, username: true, avatar: true },
      });
      chat.receiver = receiver;
      console.log(chat);
    }
    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        usersId: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        usersId: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const receiverId = req.body.receiverId;

  console.log(tokenUserId, receiverId);
  try {
    const existingChat = await prisma.chat.findFirst({
      where: {
        usersId: {
          hasEvery: [tokenUserId, receiverId],
        },
      },
    });

    console.log(existingChat);
    if (existingChat) {
      console.log("Existing chat found.");
      // If an existing chat is found, return it
      return res.status(200).json({
        message: "Existing chat found.",
        id: existingChat.id,
      });
    }
    const newChat = await prisma.chat.create({
      data: {
        usersId: [tokenUserId, req.body.receiverId],
      },
    });
    res.status(201).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
