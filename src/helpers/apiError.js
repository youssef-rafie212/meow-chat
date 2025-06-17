class ApiError extends Error{
    constructor(key,code,message){
        super();
        this.key     = key;
        this.code    = "" ;
        this.message = message ;
    }

    static NotFound(message,key,code) {
        this.key     = key;
        this.code    = this.GetCode(key);
        this.message = message;
    }

    static BadRequest(message,key,code) {
        this.key     = key ;
        this.code    = this.GetCode(key);
        this.message = message;
    }

    static UnprocessableEntity(message,key,code) {
        this.key     = key ;
        this.status  = code;
        this.message = message;
    }

    static Forbidden(message,key,code) {
        this.key     = key ;
        this.code    = this.GetCode(key);
        this.message = message;
    }
    static Exception(message,key,code) {
        this.key     = key ;
        this.code    = this.GetCode(key);
        this.message = message;
    }



    GetCode(key)
    {
        let code =""
        switch (key) {
            case 'success':
                code = 200;
                break;
            case 'fail':
                code = 400;
                break;
            case 'needActive':
                code = 203;
                break;
            case 'unauthorized':
                code = 401;
                break;
            case 'unauthenticated':
                code = 401;
                break;
            case 'blocked':
                code = 423;
                break;
            case 'notFound':
                code = 404;
                break;
            case 'exception':
                code = 500;
                break;
            case 'forbidden':
                code = 403;
                break;

            default:
                code = 200;
                break;

        }

        return code;
    }
    responseError(key,message){
        return {key : key, message: message, code : this.GetCode(key)}
    }
}

export default ApiError;