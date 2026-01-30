import BadRequest from "./BadRequest.js";

class ValidationError extends BadRequest {
    constructor(error) {
        const errorMessages = Object.values(error.errors).map(err => err.message).join("; ");

        super(`The following errors occurred: ${errorMessages}`)
    }


}

export default ValidationError;