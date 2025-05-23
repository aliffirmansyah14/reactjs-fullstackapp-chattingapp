import Messages from "../components/messsage/messages";
import Sidebar from "../components/sidebar/sidebar";

export default function Home() {
	return (
		<div className=" h-[100svh] md:h-[80svh] flex rounded-lg border border-accent shadow shadow-accent">
			<Sidebar className="w-full md:w-4/12 p-2 border-r border-accent" />
			<Messages className="md:w-8/12 hidden md:block" />
		</div>
	);
}
