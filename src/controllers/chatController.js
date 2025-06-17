import Chat from "../models/chatModel.js";
// import redisClient from "../redisClient.js";
import { errorHandler } from "../helpers/errorHandler.js";
import { responseHandler } from "../helpers/responseHandler.js";

export const createChat = async (req, res, next) => {
    try {
        const { title, participants } = req.body;
        const chat = await Chat.create({
            title,
            participants,
        });

        await responseHandler(res, "created", "ChatCreated", chat);
    } catch (err) {
        await errorHandler(res, "exception", "OperationFailed");
    }
};

export const getAllChatsForUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return await errorHandler(res, "fail", "IdNotProvided");
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const key = `${userId}.${page}.${limit}`;

        let chats;

        // not using cache as we have no update/delete endpoints and the result will always (until expiration) exist in the cache
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

        await responseHandler(res, "success", "ChatsRetrived", chats);
    } catch (err) {
        await errorHandler(res, "exception", "OperationFailed");
    }
};

export const getChatWithId = async (req, res, next) => {
    try {
        const chatId = req.params.chatId;
        if (!chatId) {
            return await errorHandler(res, "fail", "IdNotProvided");
        }

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return await errorHandler(res, "notFound", "ChatNotFound");
        }

        await responseHandler(res, "success", "ChatRetrived", chat);
    } catch {
        await errorHandler(res, "exception", "OperationFailed");
    }
};
