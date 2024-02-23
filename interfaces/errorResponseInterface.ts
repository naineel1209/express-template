interface ErrorResponse {
    message: string,
    cause?: any,
    stack?: string
}

export {
    ErrorResponse
}