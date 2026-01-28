import { author } from "../models/author.js";

class AuthorController {

    static async listAuthors(req, res) {
        try {
            const authorsList = await author.find({});
            res.status(200).json(authorsList);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - failed to retrieve authors`
            })
        }

    }

    static async listAuthorById(req, res) {
        try {
            const id = req.params.id;
            const foundAuthor = await author.findById(id);
            res.status(200).json(foundAuthor);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - failed to retrieve author`
            })
        }
    }

    static async registerAuthor(req, res) {
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

    static async updateAuthor(req, res) {
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

    static async deleteAuthor(req, res) {
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