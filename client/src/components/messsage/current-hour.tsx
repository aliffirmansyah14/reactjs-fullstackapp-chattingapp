import { useDate } from "../../hooks/useDate.ts";

export default function CurrentHour({ className }: { className?: string }) {
	const { day } = useDate();
	return (
		<p className={`${className}`}>
			{day.hours}:{day.minutes}
		</p>
	);
}
