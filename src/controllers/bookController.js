import Book from "../models/Book.js";
import NotFound from "../errors/NotFound.js";


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

            if (foundBook !== null) {
                res.status(200).json(foundBook);
            } else {
                next(new NotFound("Book id not found"));
            }

        } catch (error) {
            next(error);
        }
    }

    static registerBook = async (req, res, next) => {
        const newBook = req.body;
        try {

            const book = new Book(newBook);

            const resultBook = await book.save();

            res.status(201).json({
                message: "Book registered successfully",
                book: resultBook
            });
        } catch (error) {
            next(error);
        }
    }

    static updateBook = async (req, res, next) => {
        try {
            const id = req.params.id;
            const updatedBook = await Book.findByIdAndUpdate(id, req.body);

            if (updatedBook !== null) {
                res.status(200).json({
                    message: "Book updated successfully"
                });
            } else {
                next(new NotFound("Book id not found"));
            }
        } catch (error) {
            next(error);
        }
    }

    static deleteBook = async (req, res, next) => {
        try {
            const id = req.params.id;
            const deletedBook = await Book.findByIdAndDelete(id);

            if (deletedBook !== null) {
                res.status(200).json({
                    message: "Book deleted successfully"
                });
            } else {
                next(new NotFound("Book id not found"));
            }
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