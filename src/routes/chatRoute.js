import express from "express";
import * as chatController from "../controllers/chatController.js";

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .post(chatController.createChat)
    .get(chatController.getAllChatsForUser);

router.get("/:chatId", chatController.getChatWithId);

export default router;
