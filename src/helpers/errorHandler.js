import i18n from "i18n";
import ApiError from "./apiError.js";

let errorRes = new ApiError();

export const errorHandler = async (res, statusName, i18nMessage) => {
    await res
        .status(errorRes.GetCode(statusName))
        .send(errorRes.responseError(statusName, i18n.__(i18nMessage)));
};
