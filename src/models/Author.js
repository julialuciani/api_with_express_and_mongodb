import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: [true, "Name of the author is required"] },
    nacionality: { type: String }
}, { versionKey: false })

const author = mongoose.model("authors", authorSchema, "authors");

export { author, authorSchema };