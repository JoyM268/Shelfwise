interface BookProps {
	src: string;
	title: string;
	authors: string[];
	progress?: number;
}

export default function Book({ src, title, authors }: BookProps) {
	return (
		<div className="flex flex-col w-36 sm:w-40 text-wrap border px-2 pt-2 pb-4 border-gray-300 rounded-lg">
			<img
				src={src}
				className="w-36 sm:w-40 rounded-xs hover:scale-[1.008] cursor-pointer transition-all duration-300"
			/>
			<span className="text-[12px] sm:text-[13px] font-semibold mt-3 cursor-pointer hover:text-gray-700 transition-all duration-300">
				{title}
			</span>
			<span className="text-[10px] sm:text-[11px] font-normal mt-1">
				by{" "}
				<span className="text-blue-600 cursor-pointer">
					{authors.join(",")}
				</span>
			</span>
		</div>
	);
}
