import { type Request, type Response } from "express";
import db from "../db/prisma.js";

export const messageController = {
	sendMessage: async (req: Request, res: Response) => {
		try {
			const { id: receiverID } = req.params;
			const senderId = req.user.id;

			const { message } = req.body;

			if (!message) {
				return res.status(400).json({ error: "Teks pesan harus diisi" });
			}
			await db.$transaction(async dbTx => {
				let conversation = await dbTx.conversation.findFirst({
					where: {
						participantsId: {
							hasEvery: [senderId, receiverID],
						},
					},
				});

				if (!conversation) {
					conversation = await dbTx.conversation.create({
						data: {
							participantsId: {
								set: [senderId, receiverID],
							},
							participants: {
								connect: [{ id: senderId }, { id: receiverID }],
							},
						},
					});
				}

				const newMessage = await dbTx.message.create({
					data: {
						conversationId: conversation.id,
						senderId,
						body: message,
					},
				});

				if (newMessage) {
					conversation = await dbTx.conversation.update({
						where: {
							id: conversation.id,
						},
						data: {
							messagesId: {
								push: [newMessage.id],
							},
							messages: {
								connect: {
									id: newMessage.id,
								},
							},
						},
					});
				}

				res.status(201).json({ newMessage });
			});
		} catch (error: any) {
			console.log(`error di send message: ${error.message}`);

			res.send(500).json({ message: "Terjadi kesalahan di server" });
		}
	},
	getMessage: async (req: Request, res: Response) => {
		try {
			const { id: withUserId } = req.params;
			const senderId = req.user.id;
			const messages = await db.conversation.findFirst({
				where: {
					participantsId: {
						hasEvery: [senderId, withUserId],
					},
				},
				include: {
					messages: {
						orderBy: {
							createdAt: "asc",
						},
					},
				},
			});
			// if (!messages) {
			// 	return res.status(404).json({ error: "Konversasi tidak ditemukan" });
			// }

			res.status(200).json(messages?.messages);
		} catch (error: any) {
			console.log(`error di get messages: ${error.message}`);
			res.status(500).json({ message: "Terjadi kesalahan di server" });
		}
	},
	getUsersforSidebar: async (req: Request, res: Response) => {
		try {
			const authUserId = req.user.id;
			const users = await db.user.findMany({
				where: { NOT: { id: authUserId } },
				select: { id: true, profilePicture: true, fullname: true },
			});
			// console.log(users);

			res.status(200).json(users);
		} catch (error: any) {
			console.error(`Error from getUsersforSidebar ${error.message}`);
			res.status(500).json({ error: "Terjadi kesalahan di server" });
		}
	},
};
