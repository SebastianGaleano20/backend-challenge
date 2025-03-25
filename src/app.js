import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT || 2010;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PATH,DELETE",
  })
);

app.listen(SERVER_PORT, () => {
  console.log(`Server on listening ${SERVER_PORT}`);
});
