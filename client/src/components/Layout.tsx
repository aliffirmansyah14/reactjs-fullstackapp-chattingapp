import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<div className="p-4 flex justify-center items-center h-[100svh]">
			<div className="w-full md:max-w-[880px]">{children}</div>
		</div>
	);
}
