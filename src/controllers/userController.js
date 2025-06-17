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

        response = responseObj(201, req.__("opSuccess"), { user });
        res.send(response);
    } catch (err) {
        response = responseObj(400, req.__("opFailed"));
        res.send(response);
    }
};
