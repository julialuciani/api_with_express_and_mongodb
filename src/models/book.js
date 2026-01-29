import mongoose from 'mongoose';


const bookSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Title of the book is required"] },
    publisher: { type: String, required: [true, "Publisher of the book is required"] },
    price: { type: Number },
    pages: { type: Number },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authors",
        required: [true, "Author of the book is required"]
    }
}, { versionKey: false })

// Use singular model name and explicitly map to the 'Books' collection in Atlas
const Book = mongoose.model("Book", bookSchema, "Books");

export default Book;