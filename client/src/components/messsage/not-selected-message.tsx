import { MessageSquareIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function NotSelectedMessage() {
	const { authUser } = useAuth();

	return (
		<div className="size-full flex items-center justify-center">
			<div className="text-center space-y-1">
				<h1 className="text-2xl font-bold capitalize">
					Welcome {authUser?.fullname}
				</h1>
				<p className="text-lg">Select a chat to start messaging</p>
				<MessageSquareIcon className="mx-auto" />
			</div>
		</div>
	);
}
