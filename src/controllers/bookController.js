import Book from "../models/Book.js";
import { author } from "../models/author.js";


class BookController {

    static async listBooks(req, res) {
        try {
            const booksList = await Book.find({});
            res.status(200).json(booksList);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - failed to retrieve books`
            })
        }

    }

    static async listBookById(req, res) {
        try {
            const id = req.params.id;
            const foundBook = await Book.findById(id);
            res.status(200).json(foundBook);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - failed to retrieve book`
            })
        }
    }

    static async registerBook(req, res) {
        const newBook = req.body;
        try {

            const authorFound = await author.findById(newBook.author);
            const completeBook = {
                ...newBook, author: {
                    ...authorFound._doc
                }
            }
            const createdBook = await Book.create(completeBook);
            res.status(201).json({
                message: "Book registered successfully",
                book: newBook
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - failed to register book`
            })
        }
    }

    static async updateBook(req, res) {
        try {
            const id = req.params.id;
            await Book.findByIdAndUpdate(id, req.body);
            res.status(200).json({
                message: "Book updated successfully"
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - failed to update book`
            })
        }
    }

    static async deleteBook(req, res) {
        try {
            const id = req.params.id;
            await Book.findByIdAndDelete(id);
            res.status(200).json({
                message: "Book deleted successfully"
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - failed to delete book`
            })
        }
    }

}


export default BookController;