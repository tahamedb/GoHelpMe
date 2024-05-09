import jwt from "jsonwebtoken";
import { re } from "mathjs";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "not authenticated",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "not authenticated",
      });
    }
    req.userId = decoded.Id;
    console.log(req.userId);
    next();
  });
};
