import { useEffect, useState } from "react";
import useConversation from "../store/conversation";
import { messageList } from "../lib/api/messageApi";

export const useGetMessages = () => {
	const [isLoading, setIsloading] = useState<boolean>(true);
	const { selectedConversation, setMessages, messages } = useConversation();

	useEffect(() => {
		const controller = new AbortController();
		const getMessages = async () => {
			try {
				// setIsloading(true);
				// memicu rerender
				if (!selectedConversation) return;

				const response = await messageList(
					selectedConversation.id,
					controller.signal
				);
				if (response.status !== 200) throw new Error(response.data?.message);
				setMessages(response.data);
				setIsloading(false);
			} catch (error: any) {
				console.log(error.message);
			}
		};
		getMessages();
		return () => controller.abort();
	}, [selectedConversation]);

	return {
		messages,
		isLoading,
	};
};
