import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

console.log("Gateway PORT:", process.env.PORT);
console.log("AUTH_SERVICE:", process.env.AUTH_SERVICE);

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(cookieParser());

app.use("/auth", proxy(process.env.AUTH_SERVICE));

app.get("/", (req, res) => {
    res.json({ message: "Gateway is running" });
});

app.listen(port, () => {
    console.log(`Gateway started ${port}`);
});