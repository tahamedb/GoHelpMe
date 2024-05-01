import jwt from "jsonwebtoken";
export const shouldBeAdmin = (req, res) => {
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
    if (decoded.role !== "admin") {
      return res.status(401).json({
        message: "not admin",
      });
    }
    res.send("admin route working");
    console.log("checked");
  });
  res.send("admin route working");
  console.log("checked");
};
export const shouldBeloggedIn = (req, res) => {
  console.log(req);
  res.send("logged in route working");
};
