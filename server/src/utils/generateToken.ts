import { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (username: string, res: Response) => {
	const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
		expiresIn: "15d",
	});
	res.cookie("jwt_token", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
	});
	return token;
};

export default generateToken;
