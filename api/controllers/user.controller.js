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
