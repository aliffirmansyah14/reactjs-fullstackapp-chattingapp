export default function Layout({ children }: { children?: React.ReactNode }) {
	return (
		<main className="w-full max-w-[400px] mx-auto border border-accent rounded-lg">
			{children}
		</main>
	);
}
