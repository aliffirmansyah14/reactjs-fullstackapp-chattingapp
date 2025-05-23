import useConversation from "../../store/conversation";
import CurrentHour from "./current-hour";
import MessagesContainer from "./messages-container";
import NotSelectedMessage from "./not-selected-message";

export default function Messages({ className }: { className?: string }) {
	const { selectedConversation } = useConversation();

	return (
		<main className={`${className} p-2`}>
			{!selectedConversation ? (
				<NotSelectedMessage />
			) : (
				<div className="flex flex-col gap-1 h-full p-2">
					<Header />
					<MessagesContainer />
				</div>
			)}
		</main>
	);
}
function Header() {
	const { selectedConversation } = useConversation();

	return (
		<div className="px-4 py-2 mb-2 border-b border-accent">
			<div className="flex items-center gap-1">
				<span className="label">To:</span>
				<span className="font-bold capitalize">
					{selectedConversation?.fullname}
				</span>

				<CurrentHour className="ms-auto inline-block" />
			</div>
		</div>
	);
}
