import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(
	cors({
		origin: ["http://localhost:5173"],
		credentials: true,
	})
);
app.use(express.json());
// Define routes here

app.get("/", (_, res) => {
	res.send("Welcome to api!");
});

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.get("*", (_, res) => {
	res.status(404).send("Not Found");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

//todo : Add web socket
//todo : configure for deployment
