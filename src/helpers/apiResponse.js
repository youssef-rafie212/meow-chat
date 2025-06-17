class ApiResponse {
    GetCode(key) {
        let code = "";
        switch (key) {
            case "success":
                code = 200;
                break;
            case "created":
                code = 200;
                break;
            case "noContent":
                code = 204;
                break;
            default:
                code = 200;
                break;
        }

        return code;
    }
    response(key, message, data) {
        return { key: key, message: message, code: this.GetCode(key), data };
    }
}

export default ApiResponse;
