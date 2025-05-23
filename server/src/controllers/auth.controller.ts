import { type Request, type Response, type NextFunction } from "express";
import db from "../db/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const authController = {
	signup: async (req: Request, res: Response) => {
		try {
			const { username, password, confirmPassword, fullname, gender } =
				req.body;

			if (!username || !password || !fullname || !gender || !confirmPassword) {
				return res.status(400).json({ error: "Tolong isi semua data" });
			}

			if (password !== confirmPassword) {
				return res
					.status(400)
					.json({ error: "password dan konfirmasi password tidak sama" });
			}
			const user = await db.user.findUnique({ where: { username } });
			if (user) {
				return res.status(400).json({ error: "Username sudah digunakan" });
			}

			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, salt);
			const profilePicture =
				gender === "male"
					? getProfilePicture("boy", username)
					: getProfilePicture("girl", username);

			const newUser = await db.user.create({
				data: {
					username,
					password: hashPassword,
					fullname,
					gender,
					profilePicture,
				},
			});

			if (newUser) {
				const token = generateToken(newUser.id, res);

				return res.status(201).json({
					username: newUser.username,
					fullname: newUser.fullname,
					profilePicture: newUser.profilePicture,
					gender: newUser.gender,
					id: newUser.id,
				});
			} else {
				res.status(400).json({ error: "Tidak bisa membuat user" });
			}
		} catch (error: any) {
			console.error(error.message);
			res.status(500).json({ error: "Internal server error" });
		}
	},
	login: async (req: Request, res: Response) => {
		try {
			const isLogin = req.user?.id;

			if (isLogin) {
				return res.status(200).json({ message: "Sudah login" });
			}

			const { username, password } = req.body;

			if (!username || !password) {
				return res
					.status(400)
					.json({ error: "Tolong isi username dan password" });
			}
			const user = await db.user.findUnique({ where: { username } });

			if (!user) {
				return res.status(401).json({ error: "Username atau password salah" });
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (!isPasswordValid) {
				return res.status(401).json({ error: "Username atau password salah" });
			}
			const token = generateToken(user.id, res);

			return res.status(200).json({
				username: user.username,
				fullname: user.fullname,
				profilePicture: user.profilePicture,
				gender: user.gender,
				id: user.id,
			});
		} catch (error: any) {
			console.log(error.message);
			res.status(500).json({ error: "Terjadi kesalahan diserver" });
		}
	},
	logout(req: Request, res: Response, next: NextFunction) {
		try {
			res.clearCookie("jwt_token");
			return res.status(200).json({ message: "Berhasil logout" });
		} catch (error: any) {
			console.log(error.message);
			res.status(500).json({ error: "kesalahan terjadi diserver" });
		}
	},
	async getMe(req: Request, res: Response) {
		try {
			const user = await db.user.findUnique({ where: { id: req.user.id } });
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}
			return res.json({
				id: user.id,
				username: user.username,
				fullname: user.fullname,
				profilePicture: user.profilePicture,
			});
		} catch (error: any) {
			console.log(error.message);
			res.status(500).json({ error: "Terjadi kesalahan di server" });
		}
	},
};

const getProfilePicture = (gender: "boy" | "girl", username: string) => {
	return `https://avatar.iran.liara.run/public/${gender}?username=${username}`;
};
