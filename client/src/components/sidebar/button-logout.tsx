import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";
import useConversation from "../../store/conversation";

export default function LogoutButton() {
	const { isLoading, logout } = useLogout();
	const { setSelectedConversation } = useConversation();
	const handleLogout = () => {
		setSelectedConversation(null);
		logout();
	};

	return (
		<button
			className="btn btn-xs btn-ghost"
			onClick={handleLogout}
			disabled={isLoading}
		>
			<LogOut className="text-white cursor-pointer" />
		</button>
	);
}
