export class CustomError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, CustomError.prototype);
        Error.captureStackTrace(this, this.constructor);
        
    }
}