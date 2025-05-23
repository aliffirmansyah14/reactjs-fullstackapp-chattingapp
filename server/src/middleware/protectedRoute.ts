import { type NextFunction, type Request, type Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from "../db/prisma.js";

interface DecodedToken extends JwtPayload {
	userId: string;
}

const protectedRoute = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// console.log(`request from : ${req.url}`);

	try {
		const token = req.cookies.jwt_token;

		if (!token) {
			return res.status(401).json({ error: "Harus login terlebih dahulu" });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

		if (!decoded) {
			return res.status(403).json({ error: "Token invalid" });
		}

		const user = await db.user.findFirst({
			where: { id: decoded.userId },
			select: {
				id: true,
				username: true,
				fullname: true,
				profilePicture: true,
			},
		});

		if (!user) {
			return res.status(403).json({ error: "User tidak ditemukan" });
		}

		req.user = { id: user.id };

		next();
	} catch (error: any) {
		console.log(`error at protected route: ${error.message}`);
		res.status(500).json({ error: "terjadi kesalahan diserver" });
	}
};
export default protectedRoute;
