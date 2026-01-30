import { author } from "../models/author.js";
import NotFound from "../errors/NotFound.js";


class AuthorController {

    static listAuthors = async (req, res, next) => {
        try {
            const authorsList = await author.find({});
            res.status(200).json(authorsList);
        } catch (error) {
            next(error);
        }
    }

    static listAuthorById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const foundAuthor = await author.findById(id);

            if (foundAuthor !== null) {
                res.status(200).json(foundAuthor);
            } else {
                next(new NotFound("Author id not found"));
            }

        } catch (error) {
            next(error);
        }
    }

    static registerAuthor = async (req, res, next) => {
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json({
                message: "Author registered successfully",
                author: newAuthor
            });
        } catch (error) {
            next(error);
        }
    }

    static updateAuthor = async (req, res, next) => {
        try {
            const id = req.params.id;
            const updatedAuthor = await author.findByIdAndUpdate(id, req.body);

            if (updatedAuthor !== null) {
                res.status(200).json({
                    message: "Author updated successfully"
                });
            } else {
                next(new NotFound("Author id not found"));
            }

        } catch (error) {
            next(error);
        }
    }

    static deleteAuthor = async (req, res, next) => {
        try {
            const id = req.params.id;
            const deletedAuthor = await author.findByIdAndDelete(id);

            if (deletedAuthor !== null) {
                res.status(200).json({
                    message: "Author deleted successfully"
                });
            } else {
                next(new NotFound("Author id not found"));
            }

        } catch (error) {
            next(error);

        }
    }

}


export default AuthorController;