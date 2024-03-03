import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

app.listen(5000, () => {
  connect();
  console.log("Server is running on port 5000");
});
