import User from "../models/userModel.js";
import { errorHandler } from "../helpers/errorHandler.js";
import { responseHandler } from "../helpers/responseHandler.js";

export const createUser = async (req, res, next) => {
    try {
        const { username, password, phone } = req.body;
        const user = await User.create({
            username,
            password,
            phone,
        });

        await responseHandler(res, "created", "UserCreated", user);
    } catch (err) {
        await errorHandler(res, "exception", "OperationFailed");
    }
};
