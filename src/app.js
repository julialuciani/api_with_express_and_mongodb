import express from "express";
import connectToDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import handler404 from "./middlewares/handler404.js";

const connection = await connectToDatabase();

connection.on("error", (error) => {
    console.error("Connection error:", error);
})

connection.once("open", () => {
    console.log("Database connected");
})

const app = express();

routes(app);

app.use(handler404);


app.use((error, req, res, next) => {
    errorHandler(error, req, res, next);
})

export default app;