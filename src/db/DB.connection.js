import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
	try {

		const { connection } = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

		console.log("MONGO DB CONNECTED ON HOST :: ", connection.host);

	} catch (error) {

		console.log("MONGO DB CONNECTION FAILED :: ", error);
        process.exit(1);
        
	}
};

export default connectDB;
