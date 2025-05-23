import useConversation from "../store/conversation";
import { useState } from "react";
import { toastError } from "../lib/toast";
import { messageCreate } from "../lib/api/messageApi";

export function useSendMessage() {
	const [isLoading, setIsloading] = useState<boolean>(false);
	const { selectedConversation, addMessages } = useConversation();

	const sendMessage = async (message: string) => {
		try {
			if (!selectedConversation) return;
			setIsloading(true);
			const response = await messageCreate(selectedConversation.id, message);
			if (response.status !== 201) throw new Error(response.data?.message);
			addMessages(response.data.newMessage);
			setIsloading(false);
		} catch (error: any) {
			console.log(error);
			if (error.status === 500) {
				toastError("Terjadi Kesalahan di server");
			}
		}
	};

	return {
		sendMessage,
		isLoading,
	};
}
