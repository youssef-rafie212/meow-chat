import ApiResponse from "./apiResponse.js";

const apiRes = new ApiResponse();

export const responseHandler = (res, statusName, message, data) => {
    res.status(apiRes.GetCode(statusName)).send(
        apiRes.response(statusName, message, data)
    );
};
