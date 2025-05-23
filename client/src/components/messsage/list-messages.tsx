import { MessagesType } from "../../store/conversation";
import SkeletonMessage from "../skeletons/skeleton-message";
import Message from "./message";

type ListMessagesProps = {
	messages: MessagesType[];
	isLoading: boolean;
};

export default function ListMessages({
	messages,
	isLoading,
}: ListMessagesProps) {
	return (
		<div className="flex flex-col gap-1">
			{isLoading && [...Array(3)].map((_, i) => <SkeletonMessage key={i} />)}
			{messages.length > 0 &&
				messages.map((message, i) => <Message message={message} key={i} />)}
			{!isLoading && messages.length === 0 && (
				<p className="text-center font-semibold">
					Start a message to start conversation
				</p>
			)}
		</div>
	);
}
