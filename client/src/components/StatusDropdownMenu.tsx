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
import type { StatusDropdownMenuProps } from "@/types";
import { useState } from "react";
import BookRemoveWarning from "./BookRemoveWarning";

export default function StatusDropdownMenu({
	handleBookRemove,
	status,
	id,
	changeStatus,
}: StatusDropdownMenuProps) {
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

	const [alert, setAlert] = useState(false);

	return (
		<>
			<BookRemoveWarning
				handleBookRemove={handleBookRemove}
				id={id}
				alert={alert}
				setAlert={setAlert}
			/>
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
						onClick={() => setAlert(true)}
					>
						Remove
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
