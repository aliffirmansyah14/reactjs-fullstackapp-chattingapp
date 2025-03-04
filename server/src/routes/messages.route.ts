import express, { type Request } from "express";

const messagesRouter = express.Router();

messagesRouter.get("/conversations", (req, res) => {
   res.send("message here");
});

export default messagesRouter;
