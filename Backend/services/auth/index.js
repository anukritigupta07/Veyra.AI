import express from "express";
import dotenv from "dotenv";

dotenv.config();


const port = process.env.PORT || 7001;
const app = express();

app.get("/", (req, res) => {
    res.json({ message: "Auth service is running" });
});

app.listen(port ,() => {
    console.log(`auth started on port ${
        port}`);
})