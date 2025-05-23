import { convertDateToHourMinute } from "./convertDateToHourMinute";
export const getHour = () => {
	const now = new Date();
	return convertDateToHourMinute(now);
};
