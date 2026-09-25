import express from "express";
import dotenv from "dotenv";

dotenv.config();


const port = process.env.PORT || 7000;
const app = express();

app.listen(port ,() => {
    console.log(`Server is running on port ${
        port}`);
})