import BaseError from "./BaseError.js";

class BadRequest extends BaseError {
    constructor(message = "One or more fields are invalid") {
        super(message, 400);
    }
}

export default BadRequest;