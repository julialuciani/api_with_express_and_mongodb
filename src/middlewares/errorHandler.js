import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
    console.log(error);

    if (error instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "The provided ID is not valid" });
    } else if (error instanceof mongoose.Error.ValidationError) {
        const errorMessages = Object.values(error.errors).map(err => err.message).join("; ");

        res.status(400).send({ message: `The following errors occurred: ${errorMessages}` });
    }
    else {
        res.status(500).send({ message: "Internal Server Error" });
    }

}

export default errorHandler;