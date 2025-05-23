import { Send } from "lucide-react";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useTransition, useRef } from "react";

const MessageInput = ({
	handleNewMessage,
}: {
	handleNewMessage: (newMessage: string) => void;
}) => {
	const { sendMessage } = useSendMessage();
	const [isPending, startTransition] = useTransition();
	const formRef = useRef<HTMLFormElement>(null);

	const formAction = (formData: FormData) => {
		const message = formData.get("message") as string;
		if (!message) return;
		handleNewMessage(message);
		formRef.current?.reset();
		startTransition(async () => {
			await sendMessage(message);
		});
	};

	return (
		<form action={formAction} className="mb-3" ref={formRef}>
			<div className="w-full relative">
				<input
					type="text"
					className="border text-sm rounded-lg block w-full p-2.5 text-white"
					placeholder="Send a message"
					disabled={isPending}
					name="message"
				/>
				<button
					type="submit"
					className="absolute inset-y-0 cursor-pointer end-0 flex items-center pe-3"
					disabled={isPending}
				>
					<Send
						className={`${isPending} ? "text-white/50" : "text-white"} size-6`}
					/>
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
