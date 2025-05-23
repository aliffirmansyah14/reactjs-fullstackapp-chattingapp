import { axiosInstance } from "../axios";

type ConversationListProps = {
	signal?: AbortSignal;
};

export const conversationList = async (props: ConversationListProps) => {
	return axiosInstance.get("/api/messages/conversations", {
		signal: props.signal,
	});
};
