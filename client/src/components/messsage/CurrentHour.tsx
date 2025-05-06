import { useEffect, useState } from "react";
import { getHour } from "../../util/getHour";

export default function CurrentHour({ className }: { className?: string }) {
	const [day, setDay] = useState({
		hour: "",
		minute: "",
	});
	useEffect(() => {
		const interval = setInterval(() => {
			const [hour, minute] = getHour();
			setDay({
				hour,
				minute,
			});
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<p className={`${className}`}>
			{day.hour}:{day.minute}
		</p>
	);
}
