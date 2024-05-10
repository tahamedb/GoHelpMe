import { re } from "mathjs";
import prisma from "../lib/prisma.js";
export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.id;
  const text = req.body.text;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        usersId: {
          hasSome: [tokenUserId],
        },
      },
    });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    const message = await prisma.message.create({
      data: {
        text: text,
        chatId: chatId,
        userId: tokenUserId,
      },
    });
    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: [tokenUserId],
        lastMessage: text,
      },
    });
    res.status(201).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
