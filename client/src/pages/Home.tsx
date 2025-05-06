import Messages from "../components/messsage/Messages";
import Sidebar from "../components/sidebar/Sidebar";

export default function Home() {
	return (
		<div className="h-[80svh] flex rounded-lg border border-accent shadow shadow-accent">
			<Sidebar className="w-full sm:w-4/12 p-2 border-r border-accent" />
			<Messages className="sm:w-8/12" />
		</div>
	);
}
