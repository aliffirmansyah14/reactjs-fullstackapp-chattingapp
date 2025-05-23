export default function Avatar({ srcImage }: { srcImage: string }) {
	return (
		<div className="avatar online w-8 md:w-10 rounded-full relative">
			<div className="w-10 rounded-full z-10">
				<img src={srcImage} width={32} alt="user avatar" loading="lazy" />
			</div>
		</div>
	);
}
