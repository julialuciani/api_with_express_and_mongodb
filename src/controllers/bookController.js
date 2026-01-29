import Book from "../models/Book.js";
import { author } from "../models/author.js";


class BookController {

    static listBooks = async (req, res, next) => {
        try {
            const booksList = await Book.find({});
            res.status(200).json(booksList);
        } catch (error) {
            next(error);
        }

    }

    static listBookById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const foundBook = await Book.findById(id);
            res.status(200).json(foundBook);
        } catch (error) {
            next(error);
        }
    }

    static registerBook = async (req, res, next) => {
        const newBook = req.body;
        try {

            const authorFound = await author.findById(newBook.author);
            const completeBook = {
                ...newBook, author: {
                    ...authorFound._doc
                }
            }
            await Book.create(completeBook);
            res.status(201).json({
                message: "Book registered successfully",
                book: newBook
            });
        } catch (error) {
            next(error);
        }
    }

    static updateBook = async (req, res, next) => {
        try {
            const id = req.params.id;
            await Book.findByIdAndUpdate(id, req.body);
            res.status(200).json({
                message: "Book updated successfully"
            });
        } catch (error) {
            next(error);
        }
    }

    static deleteBook = async (req, res, next) => {
        try {
            const id = req.params.id;
            await Book.findByIdAndDelete(id);
            res.status(200).json({
                message: "Book deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }

    static listBooksByPublisher = async (req, res, next) => {
        const publisher = req.query.publisher;

        try {
            const booksByPublisher = await Book.find({ publisher: publisher });
            res.status(200).json(booksByPublisher);
        } catch (error) {
            next(error);
        }
    }

}


export default BookController;