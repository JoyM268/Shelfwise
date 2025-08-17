import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import type { ChangeEvent } from "react";

interface SearchProps {
	search: string;
	handleSearch(event?: ChangeEvent<HTMLInputElement>): void;
}

export default function Search({ search, handleSearch }: SearchProps) {
	return (
		<div className="relative">
			<div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
				<SearchTwoToneIcon />
			</div>
			<input
				type="text"
				className="min-w-full py-2 rounded-xl pl-12 outline-0 border border-gray-300 mx-auto bg-gray-100 placeholder:text-gray-600"
				placeholder="Search for books"
				value={search}
				onChange={handleSearch}
			/>
			{search && (
				<div
					className="absolute right-3 top-1/5 text-gray-600 cursor-pointer p-0.5 hover:bg-gray-600/10 rounded-full flex justify-center items-center"
					onClick={() => handleSearch()}
				>
					<HighlightOffIcon style={{ fontSize: "20px" }} />
				</div>
			)}
		</div>
	);
}
