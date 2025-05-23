export default function SkeletonConversation() {
	return (
		<div className="flex gap-2 w-full items-center p-2">
			<div className="size-10 rounded-full skeleton"></div>
			<div className="h-8 flex-1 skeleton"></div>
		</div>
	);
}
