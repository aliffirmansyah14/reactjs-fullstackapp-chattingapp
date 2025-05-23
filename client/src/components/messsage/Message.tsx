import { CheckCheck, ClockIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import useConversation, { MessagesType } from "../../store/conversation";
import { convertDateToHourMinute } from "../../util/convertDateToHourMinute";

export default function Message({ message }: { message: MessagesType }) {
	const { authUser } = useAuth();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser?.id;

	const chatClass = fromMe ? "chat-end" : "chat-start";
	const img = fromMe
		? authUser.profilePic
		: selectedConversation?.profilePicture;

	const bubbleBg = fromMe ? "bg-blue-500" : "bg-accent";
	const date = convertDateToHourMinute(message.createdAt);

	return (
		<div className={`chat ${chatClass}`}>
			<MessageImage img={img} />
			<MessageBubble bg={bubbleBg} body={message.body} />
			<span className="mt-1/2 chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
				{message.isPending ? <ClockIcon size={13} /> : <CheckCheck size={13} />}
				{`${date.hours}:${date.minutes}`}
			</span>
		</div>
	);
}

function MessageImage({ img }: { img: string | undefined }) {
	return (
		<div className="hidden md:block chat-image avatar">
			<div className="w-6 md:w-10 rounded-full">
				<img
					alt="Tailwind CSS chat bubble component"
					src={
						img ?? "https://avatar.iran.liara.run/public/boy?username=janedoe"
					}
				/>
			</div>
		</div>
	);
}

function MessageBubble({ bg, body }: { bg: string; body: string }) {
	return (
		<p className={`chat-bubble text-white ${bg} text-sm md:text-md`}>{body}</p>
	);
}
