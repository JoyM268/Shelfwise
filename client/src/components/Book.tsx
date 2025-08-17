interface BookProps {
	src: string;
	title: string;
	authors: string[];
	progress?: number;
}

export default function Book({ src, title, authors }: BookProps) {
	const authorsFirstNames = authors
		.map((author) => author.split(" ")[0])
		.join(", ");
	return (
		<div className="flex flex-col w-36 sm:w-40 text-wrap px-2 pt-2 pb-4">
			<img
				src={src}
				className="w-36 sm:w-40 rounded-xs hover:scale-[1.008] cursor-pointer transition-all duration-300"
			/>
			<span className="text-[12px] sm:text-[13px] font-semibold mt-3 cursor-pointer hover:text-gray-700 transition-all duration-300">
				{title.length < 21 ? title : title.slice(0, 19) + "..."}
			</span>
			<span className="text-[11px] sm:text-[12px]">
				<span className="cursor-pointer">
					{authorsFirstNames.length < 23
						? authorsFirstNames
						: authorsFirstNames.slice(0, 20) + "..."}
				</span>
			</span>
		</div>
	);
}
