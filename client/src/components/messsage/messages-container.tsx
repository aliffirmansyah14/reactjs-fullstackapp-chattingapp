import { useEffect, useOptimistic, useRef } from "react";
import ListMessages from "./list-messages";
import MessageInput from "./input-message-optimistic";
import useConversation, { MessagesType } from "../../store/conversation";
import { useAuth } from "../../context/AuthContext";
import { useGetMessages } from "../../hooks/useGetMessages";

export default function MessagesContainer() {
	const { authUser } = useAuth();
	const { isLoading } = useGetMessages();
	const { messages } = useConversation();
	const [oMessages, addOMEssages] = useOptimistic<MessagesType[], unknown>(
		messages,
		(prev, newMessage) => [
			...prev,
			{
				id: "",
				body: newMessage as string,
				createdAt: new Date(),
				isPending: true,
				senderId: authUser?.id || "",
			},
		]
	);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!scrollRef.current) return;
		scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
	}, [oMessages]);

	// console.log({ messages });

	return (
		<>
			<div className="flex-1 overflow-auto" ref={scrollRef}>
				<ListMessages messages={oMessages} isLoading={isLoading} />
			</div>
			<MessageInput handleNewMessage={addOMEssages} />
		</>
	);
}
