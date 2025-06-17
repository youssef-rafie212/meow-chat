import express from "express";
import * as userController from "../controllers/userController.js";
import chatRouter from "../routes/chatRoute.js";

const router = express.Router();

router.post("/", userController.createUser);
router.use("/:userId/chats", chatRouter);

export default router;
