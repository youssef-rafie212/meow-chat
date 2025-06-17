import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import i18n from "i18n";
import { fileURLToPath } from "url";
import path from "path";
import http from "http";
import { setupSocket } from "./socket.js";

import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";
import chatRouter from "./routes/chatRoute.js";

// Config
dotenv.config({ path: "./config.env" });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express App
const app = express();

// i18n
i18n.configure({
    locales: ["en", "ar"],
    directory: path.join(__dirname, "locales"),
    defaultLocale: "en",
    queryParameter: "lang",
    autoReload: true,
    updateFiles: false,
});

app.use((req, res, next) => {
    i18n.setLocale(req.headers.lang || "en");
    return next();
});

app.use(i18n.init);
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/chats", chatRouter);

// HTTP & Socket Server
const server = http.createServer(app);
setupSocket(server);

// MongoDB & Start
mongoose.connect(process.env.DB).then(() => {
    console.log("✅ DB connected");
    server.listen(3000, () => {
        console.log("🚀 Server running on port 3000");
    });
});
