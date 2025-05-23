import { Send } from "lucide-react";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useRef } from "react";

const MessageInput = () => {
	const { sendMessage, isLoading } = useSendMessage();
	const formRef = useRef<HTMLFormElement>(null);

	const formAction = async (formData: FormData) => {
		"use server";
		const message = formData.get("message") as string;
		if (!message) return;
		await sendMessage(message);
		formRef.current?.reset();
	};

	return (
		<form className="mb-3 " action={formAction} ref={formRef}>
			<div className="w-full relative">
				<input
					type="text"
					name="message"
					className={
						`border text-sm rounded-lg block w-full p-2.5 ` +
						(isLoading ? "text-white/50" : "text-white")
					}
					placeholder="Send a message"
					disabled={isLoading}
				/>
				<button
					type="submit"
					className="absolute inset-y-0 cursor-pointer end-0 flex items-center pe-3"
					disabled={isLoading}
				>
					<Send
						className={`${isLoading} ? "text-white/50" : "text-white"} size-6`}
					/>
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
