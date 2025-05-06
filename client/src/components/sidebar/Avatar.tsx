import { useState } from "react";
import AvatarSkeleton from "../skeletons/AvatarSkeleton";

export default function Avatar({ srcImage }: { srcImage: string }) {
	const [status, setStatus] = useState<"loading" | "loaded" | "error">(
		"loading"
	);
	return (
		<div className="avatar online w-8 md:w-10 rounded-full relative">
			{status === "loading" && <AvatarSkeleton />}
			<div className="w-8 md:w-10 rounded-full z-10">
				<img
					src={srcImage}
					width={32}
					alt="user avatar"
					loading="lazy"
					onLoad={() => setStatus("loaded")}
				/>
			</div>
		</div>
	);
}
