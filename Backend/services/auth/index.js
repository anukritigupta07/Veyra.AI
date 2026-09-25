import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// your existing imports below
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectdb from "./config/db.js";


dotenv.config();


const port = process.env.PORT || 7001;
const app = express();

app.get("/", (req, res) => {
    res.json({ message: "Auth service is running" });
});

app.listen(port ,() => {
    console.log(`auth started on port ${
        port}`);
        connectdb();
})