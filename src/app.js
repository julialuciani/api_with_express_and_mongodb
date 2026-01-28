import express from "express";
import connectToDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await connectToDatabase();

connection.on("error", (error) => {
    console.error("Connection error:", error);
})

connection.once("open", ()=> {
    console.log("Database connected");
})

const app = express();

routes(app);


// app.post('/books', (req, res) => {
//     books.push(req.body);  
//     res.status(201).send("Book added successfully!");
// })

// app.get('/books/:id', (req, res) => {
//     const index = searchBookById(req.params.id);

//     res.status(200).json(books[index]);

// })

// app.put('/books/:id', (req, res) => { 
//     const index = searchBookById(req.params.id);

//     books[index].title = req.body.title;

//     res.status(200).json(books);
// })

// app.delete('/books/:id', (req, res) => { 
//     const index = searchBookById(req.params.id);

//     books.splice(index, 1);

//     res.status(200).send("Book deleted successfully!");
// })

export default app;