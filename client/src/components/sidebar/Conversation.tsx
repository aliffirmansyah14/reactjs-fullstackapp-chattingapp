import { conversation } from "../../dummy_data/dummy";
import Avatar from "./Avatar";

const Conversation = ({ conversation }: { conversation: conversation }) => {
	return (
		<div className="flex gap-2 items-center hover:bg-accent rounded p-2 cursor-pointer border-b border-b-accent last:border-b-0">
			<Avatar srcImage={conversation.profilePic} />
			<div className="flex-1">
				<div className="flex gap-3 justify-between">
					<p className="font-bold text-gray-200 text-sm md:text-md">
						{conversation.fullName}
					</p>
					<span className="text-xl hidden md:inline-block">
						{conversation.emoji}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Conversation;
