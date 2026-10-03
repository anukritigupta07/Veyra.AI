import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// your existing imports below
import express from "express";
import dotenv from "dotenv";

import connectdb from "./config/db.js";
import router from "./routes/auth.route.js";


dotenv.config();


const port = process.env.PORT || 7001;
const app = express();
app.use(express.json());
app.use("/", router)
app.get("/", (req, res) => {
    res.json({ message: "Auth service is running" });
});

app.listen(port ,() => {
    console.log(`auth started on port ${
        port}`);
        connectdb();
})