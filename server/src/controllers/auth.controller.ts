import { type Request, type Response, type NextFunction } from "express";
import db from "../db/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const authController = {
   async signup(req: Request, res: Response) {
      try {
         const { username, password, confirmPassword, fullname, gender } =
            req.body;

         if (
            !username ||
            !password ||
            !fullname ||
            !gender ||
            !confirmPassword
         ) {
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
            const token = generateToken(username, res);

            return res.json({ id: newUser.id, token });
         } else {
            res.status(400).json({ error: "Tidak bisa membuat user" });
         }
      } catch (error: any) {
         console.error(error.message);
         res.status(500).json({ error: "Internal server error" });
      }
   },
   async login(req: Request, res: Response) {
      try {
         const { username, password } = req.body;
         if (!username || !password) {
            return res
               .status(400)
               .json({ error: "Tolong isi username dan password" });
         }
         const user = await db.user.findUnique({ where: { username } });
         if (!user) {
            return res
               .status(401)
               .json({ error: "Username atau password salah" });
         }
         const isPasswordValid = await bcrypt.compare(password, user.password);
         if (!isPasswordValid) {
            return res
               .status(401)
               .json({ error: "Username atau password salah" });
         }
         const token = generateToken(username, res);

         return res.status(200).json({
            username: user.username,
            fullname: user.fullname,
            profilePicture: user.profilePicture,
            token,
         });
      } catch (error: any) {
         console.log(error.message);
         res.status(500).json({ error: "Internal server error" });
      }
   },
   logout(req: Request, res: Response, next: NextFunction) {
      try {
         res.clearCookie("jwt-token");
         return res.status(200).json({ message: "Berhasil logout" });
      } catch (error: any) {
         console.log(error.message);
         res.status(500).json({ error: "kesalahan terjadi diserver" });
      }
      res.send("Loggout successful");
   },
   async getMe(req: Request, res: Response) {
      try {
         const user = await db.user.findUnique({ where: { id: req.user.id } });
         if (!user) {
            return res.status(404).json({ error: "User not found" });
         }
         return res.json({
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
