import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connection established");
    })
    .catch((e) => {
        console.log("Error connecting to Mongo");
        console.log(e);
    });
