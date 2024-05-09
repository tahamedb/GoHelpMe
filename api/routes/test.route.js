import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  shouldBeloggedIn,
  shouldBeAdmin,
} from "../controllers/test.controller.js";
const router = express.Router();
router.get("/", verifyToken, shouldBeloggedIn);
router.get("/ha", shouldBeAdmin);
export default router;
