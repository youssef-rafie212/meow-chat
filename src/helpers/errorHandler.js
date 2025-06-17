import i18n from "i18n";
import ApiError from "./apiError.js";

let errorRes = new ApiError();

export const errorHandler = (res, statusName, i18nMessage) => {
    // problem with can't set headers after they are sent to the client
    // res.status(errorRes.GetCode(statusName)).send(errorRes.responseError(statusName, i18n.(i18nMessage)));
    // // throw { statusName, i18nMessage };
    // throw errorRes.responseError(statusName, i18nMessage);

    // solve the problem with can't set headers after they are sent to the client
    // const error = errorRes.responseError(statusName, i18nMessage);
    // console.log({key: error.key, message: i18nMessage, code: error.code});
    console.log(res, statusName, i18nMessage);
    res.status(errorRes.GetCode(statusName)).send(
        errorRes.responseError(statusName, i18n.__(i18nMessage))
    );
};
