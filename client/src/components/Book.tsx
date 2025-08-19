import { NavLink } from "react-router-dom";
import StatusDropdownMenu from "./StatusDropdownMenu";
import type { BookStatus } from "@/pages/Library";

interface BookProps {
	id: string;
	src: string;
	title: string;
	authors: string[];
	progress?: number;
	status?: BookStatus;
	changeStatus?: (id: string, status: BookStatus) => void;
	handleBookRemove?: (id: string) => void;
}

export default function Book({
	id,
	src,
	title,
	authors,
	changeStatus,
	status,
	handleBookRemove,
}: BookProps) {
	const authorsFirstNames = authors
		.map((author) => author.split(" ")[0])
		.join(", ");

	return (
		<div className="flex flex-col w-36 sm:w-40 text-wrap px-2 pt-2 pb-4 relative">
			{status && changeStatus && handleBookRemove && (
				<StatusDropdownMenu
					id={id}
					status={status}
					changeStatus={changeStatus}
					handleBookRemove={handleBookRemove}
				/>
			)}
			<NavLink to={`/book/${id}`}>
				<img
					src={src}
					className="w-36 sm:w-40 rounded-xs hover:scale-[1.008] cursor-pointer transition-all duration-300"
				/>
			</NavLink>
			<span className="text-[12px] sm:text-[13px] font-semibold mt-3 cursor-pointer hover:text-gray-700 transition-all duration-300">
				<NavLink to={`/book/${id}`}>
					{title.length < 21 ? title : title.slice(0, 19) + "..."}
				</NavLink>
			</span>

			<span className="text-[11px] sm:text-[12px]">
				<span>
					{authorsFirstNames.length < 23
						? authorsFirstNames
						: authorsFirstNames.slice(0, 20) + "..."}
				</span>
			</span>
		</div>
	);
}
