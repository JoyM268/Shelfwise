export default function BookCategory({ category }: { category: string }) {
	return (
		<div className="bg-gray-200 text-gray-700 font-medium px-2 rounded-lg py-1">
			{category}
		</div>
	);
}
