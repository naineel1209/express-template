class CustomError extends Error{
    statusCode :number
    statusMessage :string
    message :string

    constructor(statusCode :number, statusMessage :string, message :string, stack ?:string|undefined){
        super(message, {
            cause : stack 
        });
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.message = message;
    }
}

export default CustomError;