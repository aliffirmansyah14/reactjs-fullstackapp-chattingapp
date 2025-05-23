import { useEffect, useState } from "react";

export function useDebounceValue<T>(initialValue: T, delay: number = 500) {
	const [value, setValue] = useState<T>(initialValue);

	useEffect(() => {
		const timo = setTimeout(() => {
			setValue(initialValue);
		}, delay);
		return () => clearTimeout(timo);
	}, [initialValue, delay]);

	return value;
}
