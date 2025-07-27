import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(port, () => {
      console.log(`server smelling from port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });