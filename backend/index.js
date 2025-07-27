import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hello dude great to see you here.`);
});

app.listen(port, () => {
  console.log(`server smelling from port ${port}`);
});
