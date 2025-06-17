import { Server } from "socket.io";
import mongoose from "mongoose";
import Chat from "./models/chatModel.js";
import Message from "./models/messageModel.js";

export function setupSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://127.0.0.1:5500",
        },
    });

    // store current online users mapped to their sockets
    const onlineUsers = new Map();

    io.on("connection", (socket) => {
        const userId = socket.handshake.auth.userId;

        if (!userId) {
            console.log("Connection rejected: No userId");
            socket.disconnect(true);
            return;
        }

        socket.user = userId;
        console.log(`✅ Socket connected: ${socket.id} (user: ${userId})`);

        onlineUsers.set(userId, socket);

        socket.on("join", async ({ room }) => {
            if (!room) return;

            let chat = await Chat.findById(room);

            if (!chat) {
                chat = await Chat.create({
                    _id: new mongoose.Types.ObjectId(room),
                    participants: [userId],
                });
            }

            socket.join(room);

            if (!chat.participants.includes(userId)) {
                chat.participants.push(userId);
                await chat.save();
            }

            console.log(`🚪 ${userId} joined room ${room}`);
        });

        socket.on("leave", ({ room }) => {
            if (!room) return;
            socket.leave(room);
            console.log(`🚪 ${userId} left room ${room}`);
        });

        socket.on("message", async ({ text, room }) => {
            if (!text || !room) return;

            const message = await Message.create({
                from: userId,
                text,
                chatId: room,
            });

            const updatedChat = await Chat.findByIdAndUpdate(
                room,
                { lastMessage: message._id },
                { new: true }
            ).populate("participants");

            io.to(room).emit("message", { from: userId, text });
            console.log(`📤 Message from ${userId} to room ${room}: ${text}`);

            // notifications
            const participants = updatedChat.participants;

            for (const participant of participants) {
                if (participant.id === userId) continue;

                const participantSocket = onlineUsers.get(participant.id);

                // user is offline
                if (!participantSocket) {
                    console.log(`push notification to user ${participant.id}`);
                    continue;
                }

                // user is online but not in the chat (room)
                if (!participantSocket.rooms.has(room)) {
                    participantSocket.emit("onlineNotification", {
                        from: userId,
                        text,
                    });
                }
            }
        });

        socket.on("disconnect", () => {
            onlineUsers.delete(userId);
            console.log(`🔌 ${userId} disconnected`);
        });
    });
}
