class ApiError {
    GetCode(key) {
        let code = "";
        switch (key) {
            case "fail":
                code = 400;
                break;
            case "unauthorized":
                code = 401;
                break;
            case "unauthenticated":
                code = 401;
                break;
            case "blocked":
                code = 423;
                break;
            case "notFound":
                code = 404;
                break;
            case "exception":
                code = 500;
                break;
            case "forbidden":
                code = 403;
                break;

            default:
                code = 500;
                break;
        }

        return code;
    }
    responseError(key, message) {
        return { key: key, message: message, code: this.GetCode(key) };
    }
}

export default ApiError;
