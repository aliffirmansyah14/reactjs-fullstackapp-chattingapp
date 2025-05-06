import { DUMMY_CONVERSATIONS } from "../../dummy_data/dummy";
import Conversation from "./Conversation";

export default function Listconversations() {
	return (
		<div className="flex flex-col gap-1">
			{DUMMY_CONVERSATIONS.map((conversation, i) => (
				<Conversation key={i} conversation={conversation} />
			))}
		</div>
	);
}
