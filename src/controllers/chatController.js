import Chat from "../models/chatModel.js";
import redisClient from "../redisClient.js";
import { responseObj } from "../helpers/responseObj.js";

export const createChat = async (req, res, next) => {
    let response;
    try {
        const { title, participants } = req.body;
        const chat = await Chat.create({
            title,
            participants,
        });

        response = responseObj(201, "chat created", { chat });
        res.send(response);
    } catch (err) {
        response = responseObj(400, "chat creation failed");
        res.send(response);
    }
};

export const getAllChatsForUser = async (req, res, next) => {
    let response;
    try {
        const userId = req.params.userId;
        if (!userId) {
            response = responseObj(400, "user id doesn't exist");
            return res.send(response);
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const key = `${userId}.${page}.${limit}`;

        const cached = await redisClient.get(key);

        if (cached) {
            response = responseObj(200, "chats retreved from cache", {
                cached,
            });
            return res.send(response);
        }

        const chats = await Chat.find({ participants: userId })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        await redisClient.setEx(key, 600, JSON.stringify(chats));

        response = responseObj(200, "chats retreved from DB", { cached });
        return res.send(response);
    } catch (err) {
        response = responseObj(500, "inernal error");
        res.send(response);
    }
};

export const getChatWithId = async (req, res, next) => {
    let response;
    try {
        const chatId = req.params.chatId;
        if (!chatId) {
            response = responseObj(400, "chat id doesn't exist");
            return res.send(response);
        }

        const chat = await Chat.findById(chatId);

        if (!chat) {
            response = responseObj(404, "chat doesn't exist");
            return res.send(response);
        }

        response = responseObj(200, "chat retreved from DB", { chat });
        return res.send(response);
    } catch {
        response = responseObj(500, "inernal error");
        res.send(response);
    }
};
