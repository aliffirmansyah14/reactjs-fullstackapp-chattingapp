import React from "react";

interface Input extends React.ComponentProps<"input"> {
	icon: React.ReactNode;
	children?: React.ReactNode;
}

export default function Input({ className, icon, children, ...props }: Input) {
	return (
		<div>
			<label className={`${className} input w-full`}>
				{icon}
				<input
					className={className ? "text-red-500" : "text-white"}
					{...props}
				/>
			</label>
			{children}
		</div>
	);
}

Input.InputMessage = function InputMessage({
	message,
}: {
	message: string | string[] | undefined;
}) {
	if (!message) return null;
	return (
		<div className="validator-hint text-red-500">
			{typeof message === "string"
				? message
				: message.map((m, i) => (
						<React.Fragment key={i}>
							{m} <br />
						</React.Fragment>
				  ))}
		</div>
	);
};
