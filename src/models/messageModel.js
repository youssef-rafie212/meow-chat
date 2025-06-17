import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        from: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true },
        chatId: { type: mongoose.Types.ObjectId, ref: "Chat" },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
