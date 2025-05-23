import { GenericAbortSignal } from "axios";
import { axiosInstance } from "../axios";

export const messageList = async (
	conversationId: string,
	signal: GenericAbortSignal
) => {
	return await await axiosInstance.get(`/api/messages/${conversationId}`, {
		signal,
	});
};

export const messageCreate = async (
	conversationId: string,
	message: string
) => {
	return await axiosInstance.post(`/api/messages/send/${conversationId}`, {
		message,
	});
};
