import { message } from "../../dummy_data/dummy";

export default function Message({ message }: { message: message }) {
	const fromMe = message.fromMe;
	const chatClass = fromMe ? "chat-end" : "chat-start";
	const img = fromMe
		? "https://avatar.iran.liara.run/public/boy?username=johndoe"
		: "https://avatar.iran.liara.run/public/boy?username=janedoe";

	const bubbleBg = fromMe ? "bg-blue-500" : "bg-accent";

	return (
		<div className={`chat ${chatClass}`}>
			<MessageImage img={img} />
			<MessageBubble bg={bubbleBg} body={message.body} />
			<span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
				22:59
			</span>
		</div>
	);
}

function MessageImage({ img }: { img: string }) {
	return (
		<div className="hidden md:block chat-image avatar">
			<div className="w-6 md:w-10 rounded-full">
				<img alt="Tailwind CSS chat bubble component" src={img} />
			</div>
		</div>
	);
}

function MessageBubble({ bg, body }: { bg: string; body: string }) {
	return (
		<p className={`chat-bubble text-white ${bg} text-sm md:text-md`}>{body}</p>
	);
}
