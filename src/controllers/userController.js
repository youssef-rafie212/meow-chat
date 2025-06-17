import User from "../models/userModel.js";
import { responseObj } from "../helpers/responseObj.js";

export const createUser = async (req, res, next) => {
    let response;
    try {
        const { username, password, phone } = req.body;
        const user = await User.create({
            username,
            password,
            phone,
        });

        response = responseObj(201, "user created", { user });
        res.send(response);
    } catch (err) {
        response = responseObj(400, "user creation failed");
        res.send(response);
    }
};
