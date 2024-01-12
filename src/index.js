import connectDB from "./db/DB.connection.js";
import dotenv from "dotenv";


// config environment variables
dotenv.config({
  path: "./.env",
});



import app from "./app.js";
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () =>
      console.log("⚙️  SERVER START RUNNING ON :: ", process.env.PORT || 8000)
    );
  })
  .catch(() => {
    console.log("MONGO DB CONNECTION FAILED :: ", error);
  });


