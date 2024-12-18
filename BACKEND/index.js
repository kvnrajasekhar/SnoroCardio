import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 5000;

const corsOptions = {
    origin: true,
    credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/", (req, res) => {
  res.json({
    status: "Get request successfull!",
  });
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})