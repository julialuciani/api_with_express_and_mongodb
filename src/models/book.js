import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title : {type: String, required: true},
    publisher : {type: String},
    price: {type: Number},
    pages: {type: Number}
}, {versionKey: false})

// Use singular model name and explicitly map to the 'Books' collection in Atlas
const Book = mongoose.model("Book", bookSchema, "Books");

export default Book;