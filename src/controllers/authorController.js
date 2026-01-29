import { author } from "../models/author.js";
import mongoose from "mongoose";

class AuthorController {

    static listAuthors = async (req, res) => {
        try {
            const authorsList = await author.find({});
            res.status(200).json(authorsList);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - failed to retrieve authors`
            })
        }

    }

    static listAuthorById = async (req, res) => {
        try {
            const id = req.params.id;
            const foundAuthor = await author.findById(id);

            if (foundAuthor !== null) {
                res.status(200).json(foundAuthor);
            } else {
                res.status(404).json({
                    message: "Author not found"
                });
            }

        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                res.status(400).send({ message: "The provided ID is not valid" });
                return;
            }
            res.status(500).json({
                message: `Erro interno de servidor - ${error.message}`
            })
        }
    }

    static registerAuthor = async (req, res) => {
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json({
                message: "Author registered successfully",
                author: newAuthor
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - failed to register author`
            })
        }
    }

    static updateAuthor = async (req, res) => {
        try {
            const id = req.params.id;
            await author.findByIdAndUpdate(id, req.body);
            res.status(200).json({
                message: "Author updated successfully"
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - failed to update author`
            })
        }
    }

    static deleteAuthor = async (req, res) => {
        try {
            const id = req.params.id;
            await author.findByIdAndDelete(id);
            res.status(200).json({
                message: "Author deleted successfully"
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - failed to delete author`
            })
        }
    }

}


export default AuthorController;