import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
// Define routes here

app.get("/", (_, res) => {
   res.send("Welcome to api!");
});

app.use("/api/auth", authRouter);

app.get("*", (_, res) => {
   res.status(404).send("Not Found");
});

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
