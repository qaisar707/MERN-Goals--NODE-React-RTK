import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import goalRoutes from "./routes/goalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.port || 4004;
app.use("/goals", goalRoutes);
app.use("/users", userRoutes);
app.listen(port, () => console.log(`server is running on port ${port}`));

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() =>
    console.log("<<<<<<-------MONGODB CONNECTED AND MONGOD RUNNING------->>>>>")
  )
  .catch((err) => console.log('-----',err.message));
