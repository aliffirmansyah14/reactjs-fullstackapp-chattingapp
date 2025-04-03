import express, { type RequestHandler } from "express";
import { messageController } from "../controllers/message.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const messageRouter = express.Router();

messageRouter.get(
   "/conversations",
   protectedRoute as RequestHandler,
   messageController.getUsersforSidebar as RequestHandler
);
messageRouter.get(
   "/:id",
   protectedRoute as RequestHandler,
   messageController.getMessage as RequestHandler
);
messageRouter.post(
   "/send/:id",
   protectedRoute as RequestHandler,
   messageController.sendMessage as RequestHandler
);

export default messageRouter;
