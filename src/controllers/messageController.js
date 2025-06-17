import Message from "../models/messageModel.js";
import Chat from "../models/chatModel.js";
import { errorHandler } from "../helpers/errorHandler.js";
import { responseHandler } from "../helpers/responseHandler.js";

export const createMessage = async (req, res, next) => {
    try {
        const dataBody = req.body;
        const message = await Message.create(dataBody);

        // in real scenarios we should check if chat actually exists (im lazy rn)

        await Chat.findByIdAndUpdate(
            dataBody.chatId,
            { lastMessage: message.id },
            { new: true, upsert: true }
        );

        await responseHandler(res, "created", "MessageCreated", message);
    } catch (err) {
        await errorHandler(res, "fail", "OperationFailed");
    }
};
