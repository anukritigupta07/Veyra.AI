import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
dotenv.config();

console.log("Gateway PORT:", process.env.PORT);
console.log("AUTH_SERVICE:", process.env.AUTH_SERVICE);

const port = process.env.PORT || 7000;
const app = express();

app.use("/auth" , proxy(process.env.AUTH_SERVICE));

app.get("/", (req, res) => {
    res.json({ message: "Gateway is running" });
});

app.listen(port ,() => {
    console.log(`Gateway started ${
        port}`);
})