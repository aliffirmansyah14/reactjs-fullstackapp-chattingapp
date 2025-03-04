import express, { type RequestHandler } from "express";
import { authController } from "../controllers/auth.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const authRouter = express.Router();

authRouter.post("/login", authController.login as RequestHandler);
authRouter.post("/logout", authController.logout as RequestHandler);
authRouter.post("/signup", authController.signup as RequestHandler);
authRouter.get(
   "/me",
   protectedRoute as RequestHandler,
   authController.getMe as RequestHandler
);

export default authRouter;
