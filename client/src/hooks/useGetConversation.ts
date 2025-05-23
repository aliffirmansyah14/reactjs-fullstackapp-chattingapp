import { useEffect, useState } from "react";
import { ConversationType } from "../store/conversation";
import { conversationList } from "../lib/api/conversationApi";
import { toastError } from "../lib/toast";

export default function useGetConversation() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [conversations, setConversations] = useState<ConversationType[]>([]);

	useEffect(() => {
		const controller = new AbortController();
		const getConversations = async () => {
			try {
				const response = await conversationList({ signal: controller.signal });
				if (response.status !== 200) throw new Error(response.data.message);
				setConversations(response.data);
			} catch (error: any) {
				if (error.code !== "ERR_CANCELED") {
					toastError(error.message);
				}
			} finally {
				setIsLoading(false);
			}
		};
		getConversations();
		return () => controller.abort();
	}, []);

	return {
		isLoading,
		conversations,
	};
}
