import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import currencyRoute from "./routes/currency.route";
import cookieParser from "cookie-parser";
import path from "path";
import { ErrorHandler } from "./utils/error";

dotenv.config();

const uri = `mongodb+srv://${encodeURIComponent(
  process.env.MONGO_USERNAME as string
)}:${encodeURIComponent(
  process.env.MONGO_PASSWORD as string
)}@cluster0.m7rmckh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err: Error) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3005, () => {
  console.log("Server is running on port 3005!");
});

app.use("/api/currency", currencyRoute);

app.use((err: ErrorHandler, req: Request, res: Response) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
