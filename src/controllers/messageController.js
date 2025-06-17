import Message from "../models/messageModel.js";
import Chat from "../models/chatModel.js";
import { responseObj } from "../helpers/responseObj.js";

export const createMessage = async (req, res, next) => {
    let response;
    try {
        const dataBody = req.body;
        const message = await Message.create(dataBody);

        await Chat.findByIdAndUpdate(
            dataBody.chatId,
            { lastMessage: message.id },
            { new: true, upsert: true }
        );

        response = responseObj(201, "message created", { message });
        res.send(response);
    } catch (err) {
        response = responseObj(400, "message creation failed");
        res.send(response);
    }
};
