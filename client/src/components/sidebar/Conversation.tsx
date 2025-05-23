import useConversation, { ConversationType } from "../../store/conversation";
import getRandomEmoji from "../../util/getRandomEmoji";
import Avatar from "./avatar";

const Conversation = ({ conversation }: { conversation: ConversationType }) => {
	const emoji = getRandomEmoji();
	const { selectedConversation, setSelectedConversation, setMessages } =
		useConversation();
	const isSelected = selectedConversation?.id === conversation.id;
	const handleSelectConversation = () => {
		setMessages([]);
		if (!isSelected) {
			setSelectedConversation(conversation);
			return;
		} // clear messages when conversation is unselected
		setSelectedConversation(null);
	};

	return (
		<div
			className={`${
				isSelected ? "bg-accent/70" : ""
			} flex gap-2 items-center hover:bg-accent rounded p-2 cursor-pointer border-b border-b-accent last:border-b-0`}
			onClick={handleSelectConversation}
		>
			<Avatar srcImage={conversation.profilePicture} />
			<div className="flex-1">
				<div className="flex gap-3 justify-between">
					<p className="font-bold capitalize text-gray-200 text-sm md:text-md">
						{conversation.fullname}
					</p>
					<span className="text-xl inline-block">{emoji}</span>
				</div>
			</div>
		</div>
	);
};

export default Conversation;
