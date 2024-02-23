import CustomError from "./CustomError"
import status from "http-status"

const errorThrower = (statusCode :number, message :string) :CustomError => {
    return new CustomError(statusCode, status[statusCode], message);
}

export default errorThrower;