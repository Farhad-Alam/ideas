import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import User from "./routes/UserRoute.js";
import Post from "./routes/PostRoute.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

export const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "server/config/config.env" });
}

// Middlewares
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Routes
app.use("/api/v1", User);
app.use("/api/v1", Post);

// Deploy to Server

app.use(express.static(path.resolve("./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./client/build/index.html"));
});
