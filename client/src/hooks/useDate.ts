import { useEffect, useState } from "react";
import { getHour } from "../util/getHour";

export function useDate() {
	const [day, setDay] = useState(getHour);
	useEffect(() => {
		const interval = setInterval(() => {
			const { hours, minutes } = getHour();
			setDay({
				hours,
				minutes,
			});
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return {
		day,
	};
}
