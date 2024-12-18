import express from "express";
import bodyParser from "body-parser";
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



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})