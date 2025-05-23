import useGetConversation from "../../hooks/useGetConversation";
import SkeletonConversation from "../skeletons/skeleteon-conversation";
import Conversation from "./conversation";

type ListconversationsProps = {
	search: string;
};

export default function Listconversations({ search }: ListconversationsProps) {
	const { isLoading, conversations } = useGetConversation();

	const filteredConversations = conversations.filter(conversation =>
		conversation.fullname.toLowerCase().includes(search)
	);
	return (
		<div className="flex flex-col gap-1">
			{isLoading &&
				new Array(6).fill(0).map((_, i) => <SkeletonConversation key={i} />)}
			{!isLoading && filteredConversations.length === 0 && search !== "" ? (
				<p className="font-semibold text-center">
					<span className="capitalize">{search} </span>
					tidak ditemukan
				</p>
			) : (
				filteredConversations.map((conversation, i) => (
					<Conversation key={i} conversation={conversation} />
				))
			)}
		</div>
	);
}
