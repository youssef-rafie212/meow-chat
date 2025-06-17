import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        participants: [{ type: mongoose.Types.ObjectId, ref: "User" }],
        lastMessage: { type: mongoose.Types.ObjectId, ref: "Message" },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

chatSchema.virtual("messages", {
    localField: "_id",
    foreignField: "chatId",
    ref: "Message",
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
