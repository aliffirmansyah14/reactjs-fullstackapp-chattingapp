import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div className="p-0 md:p-4 flex justify-center items-center h-[100svh]">
			<div className="w-full md:max-w-[880px]">
				<Outlet />
			</div>
		</div>
	);
}
