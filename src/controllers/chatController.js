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

        response = responseObj(201, req.__("opSuccess"), { chat });
        res.send(response);
    } catch (err) {
        response = responseObj(400, req.__("opFailed"));
        res.send(response);
    }
};

export const getAllChatsForUser = async (req, res, next) => {
    let response;
    try {
        const userId = req.params.userId;
        if (!userId) {
            response = responseObj(400, req.__("badRequest"));
            return res.send(response);
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const key = `${userId}.${page}.${limit}`;

        let chats;

        // const cached = await redisClient.get(key);

        // if (cached) {
        //     chats = JSON.parse(cached);
        //     response = responseObj(200, req.__("opSuccess"), {
        //         chats,
        //     });
        //     return res.send(response);
        // }

        chats = await Chat.find({ participants: userId })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        // await redisClient.setEx(key, 600, JSON.stringify(chats));

        response = responseObj(200, req.__("opSuccess"), { chats });
        return res.send(response);
    } catch (err) {
        response = responseObj(500, req.__("internalError"));
        res.send(response);
    }
};

export const getChatWithId = async (req, res, next) => {
    let response;
    try {
        const chatId = req.params.chatId;
        if (!chatId) {
            response = responseObj(400, req.__("badRequest"));
            return res.send(response);
        }

        const chat = await Chat.findById(chatId);

        if (!chat) {
            response = responseObj(404, req.__("notFound"));
            return res.send(response);
        }

        response = responseObj(200, req.__("opSuccess"), { chat });
        return res.send(response);
    } catch {
        response = responseObj(500, req.__("internalError"));
        res.send(response);
    }
};
