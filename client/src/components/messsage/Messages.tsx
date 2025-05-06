import CurrentHour from "./CurrentHour";
import ListMessage from "./ListMessage";
import MessageInput from "./MessageInput";

export default function Messages({ className }: { className?: string }) {
	return (
		<main className={`${className} p-2`}>
			<div className="flex flex-col gap-1 h-full p-2">
				<div className="px-4 py-2 mb-2 border-b border-accent">
					<span className="label">To:</span>
					<span className="font-bold ms-1">John doe</span>
					<CurrentHour className="ms-1 inline-block" />
				</div>
				<div className="flex-1 overflow-auto">
					<ListMessage />
				</div>
				<MessageInput />
			</div>
		</main>
	);
}
