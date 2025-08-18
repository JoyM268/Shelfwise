import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface BookProps {
	id: number;
	src: string;
	title: string;
	authors: string[];
	progress?: number;
	status?: "Reading" | "Plan to Read" | "Finished";
	changeStatus?: (
		id: number,
		status: "Reading" | "Plan to Read" | "Finished"
	) => void;
	handleBookRemove?: (id: number) => void;
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

	function handleStatusChange(newStatus: string) {
		if (
			status !== newStatus &&
			changeStatus &&
			(newStatus === "Reading" ||
				newStatus === "Plan to Read" ||
				newStatus === "Finished")
		)
			changeStatus(id, newStatus);
	}

	return (
		<div className="flex flex-col w-36 sm:w-40 text-wrap px-2 pt-2 pb-4 relative">
			{status && (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<div className="bg-gray-100 py-0.5 absolute right-3 top-3 z-20 cursor-pointer rounded-md flex justify-center items-center shadow">
							<MoreVertIcon />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="mt-8">
						<DropdownMenuRadioGroup
							value={status}
							onValueChange={handleStatusChange}
						>
							<DropdownMenuRadioItem value="Plan to Read">
								Plan to Read
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="Reading">
								Reading
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="Finished">
								Finished
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="flex justify-center text-red-600"
							onClick={() => {
								if (handleBookRemove) handleBookRemove(id);
							}}
						>
							Remove
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
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
