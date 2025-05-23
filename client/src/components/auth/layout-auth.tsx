interface ILayout {
	classname?: string;
	children: React.ReactNode;
}

export default function AuthLayout({ classname, children }: ILayout) {
	return (
		<main
			className={`${classname} w-full max-w-[400px] mx-auto border border-accent rounded-lg`}
		>
			{children}
		</main>
	);
}
