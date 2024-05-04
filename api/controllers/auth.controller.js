import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    //  console.log(hashedPassword);
    console.log(process.env.DATABASE_URL);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({
      message: "user created successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "cannot create user",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const { password: userPassword, ...userInfo } = user;
    const token = jwt.sign(
      { Id: user.id, role: "admin" },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success");
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json("logged out succesfuly");
};
