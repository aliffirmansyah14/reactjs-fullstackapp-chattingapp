import React from "react";

interface RadioButtonProps extends React.ComponentProps<"input"> {
	label: string;
	value: "male" | "female";
	className?: string;
}
export default function RadioButton({
	label,
	value,
	className,
	...props
}: RadioButtonProps) {
	return (
		<label className={`label gap-2 cursor-pointer`}>
			<span className="text-sm">{label}</span>
			<input
				type="radio"
				className={`radio ${className}`}
				{...props}
				value={value}
			/>
		</label>
	);
}
