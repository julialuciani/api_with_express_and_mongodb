import mongoose from "mongoose";

async function connectToDatabase(){
	// await the connection promise so callers receive an active connection
	await mongoose.connect(process.env.DB_CONNECTION_STRING);
	return mongoose.connection;
}

export default connectToDatabase;
