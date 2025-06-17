export const responseObj = (code, message, data = {}) => {
    const statusCodeStr = String(code);
    console.log(statusCodeStr);
    const success =
        statusCodeStr.startsWith("4") || statusCodeStr.startsWith("5")
            ? false
            : true;

    return {
        code,
        success,
        message,
        data,
    };
};
