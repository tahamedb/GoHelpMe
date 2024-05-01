import express from "express";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
dotenv.config();

// Import the required module

// Create an instance of express
const app = express();
app.use(cookieParser());

// Define a port
const port = 3000;
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  console.log("hi");
  console.log(process.env.DATABASE_URL);
  res.send("Hello World!!!");
});

app.get("/api/test", (req, res) => {
  res.send("test passed");
});

// Add a console log statement
console.log("App is running...");

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
