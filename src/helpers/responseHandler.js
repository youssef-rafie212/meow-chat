import i18n from "i18n";
import ApiResponse from "./apiResponse.js";

const apiRes = new ApiResponse();

export const responseHandler = async (res, statusName, message, data) => {
    await res
        .status(apiRes.GetCode(statusName))
        .send(apiRes.response(statusName, i18n.__(message), data));
};
