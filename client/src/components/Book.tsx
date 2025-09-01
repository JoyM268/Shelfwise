import { NavLink } from "react-router-dom";
import StatusDropdownMenu from "./StatusDropdownMenu";
import type { BookProps } from "@/types";
import { useMemo } from "react";
import { Progress } from "./ui/progress";

export default function Book({
	id,
	src,
	title,
	authors,
	changeStatus,
	status,
	handleBookRemove,
	total,
	progress,
	reading = false,
}: BookProps) {
	const authorsFirstNames = useMemo(
		() => (authors || []).map((author) => author.split(" ")[0]).join(", "),
		[authors]
	);

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
					className="w-36 h-52 sm:w-40 rounded-xs hover:scale-[1.02] cursor-pointer transition-all duration-300"
				/>
			</NavLink>
			<span className="text-[0.8em] sm:text-[0.85em] font-semibold mt-1.5 cursor-pointer hover:text-gray-700 transition-all duration-300">
				<NavLink to={`/book/${id}`}>
					{title.length < 21 ? title : title.slice(0, 19) + "..."}
				</NavLink>
			</span>

			<span className="text-[0.7em] sm:text-[0.72em]">
				<span>
					{authorsFirstNames && authorsFirstNames.length < 23
						? authorsFirstNames
						: authorsFirstNames.slice(0, 20) + "..."}
				</span>
			</span>
			{reading && progress !== undefined && total !== undefined && (
				<div className="mt-0.5 select-none">
					<div className="text-[0.6em] text-gray-500 flex justify-between items-center">
						<div>{`${progress}/${total} pages`}</div>
						<div>{`${Math.round((progress / total) * 100)}%`}</div>
					</div>
					<Progress
						className="h-1 mt-1"
						value={Math.round((progress / total) * 100)}
					/>
				</div>
			)}
		</div>
	);
}
