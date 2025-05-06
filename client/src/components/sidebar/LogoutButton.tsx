import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";

export default function LogoutButton() {
	const { isLoading, logout } = useLogout();
	return (
		<button
			className="btn btn-xs btn-ghost"
			onClick={logout}
			disabled={isLoading}
		>
			<LogOut className="text-white cursor-pointer" />
		</button>
	);
}
