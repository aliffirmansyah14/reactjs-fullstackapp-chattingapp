import { Search } from "lucide-react";
import Listconversations from "./Listconversations";
import LogoutButton from "./LogoutButton";

interface ISideBar {
	className: string;
}
export default function Sidebar({ className }: ISideBar) {
	return (
		<aside className={`${className}`}>
			<div className="flex flex-col gap-3 h-full ">
				<SearchInput />
				<div className="flex-1 border-t-1 border-b-1 border-accent py-1 overflow-y-auto ">
					<Listconversations />
				</div>
				<div className="mt-auto">
					<LogoutButton />
				</div>
			</div>
		</aside>
	);
}

function SearchInput() {
	return (
		<form>
			<div className="input w-full">
				<input type="text" placeholder="Search…" />
				<button type="submit" className="text-white  ">
					<Search className="size-[1.5rem] outline-none" />
				</button>
			</div>
		</form>
	);
}
