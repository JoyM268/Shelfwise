import { useState } from "react";
import type { MouseEvent } from "react";
import { clsx } from "clsx";
import Book from "../components/Book";

const bookData: {
	id: number;
	src: string;
	title: string;
	authors: string[];
	status: "Reading" | "Plan to Read" | "Finished";
	progress: number;
	total: number;
	description: string;
}[] = [
	{
		id: 1,
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
		status: "Reading",
		progress: 0,
		total: 200,
		description: "Hello World",
	},
	{
		id: 2,
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "Hello",
		authors: ["Ayman Elmassarawy"],
		status: "Plan to Read",
		progress: 0,
		total: 200,
		description: "Hello World",
	},
	{
		id: 3,
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
		status: "Reading",
		progress: 0,
		total: 200,
		description: "Hello World",
	},
];

export default function Library() {
	const [section, setSection] = useState("All Books");
	const [books, setBooks] = useState(bookData);

	function changeStatus(
		id: number,
		status: "Reading" | "Plan to Read" | "Finished"
	) {
		const newBooks = books.map((book) => {
			if (book.id === id) {
				return {
					...book,
					status,
				};
			}
			return book;
		});
		setBooks(newBooks);
	}

	function handleSectionClick(event: MouseEvent<HTMLDivElement>) {
		event.preventDefault();
		const text = event.currentTarget.innerText;
		if (text !== section) {
			setSection(text);
			console.log(text);
		}
	}

	function handleBookRemove(id: number) {
		const newBooks = books.filter((book) => book.id !== id);
		setBooks(newBooks);
	}

	return (
		<div className="px-7 pt-5 mx-auto max-w-[1350px] gap-5 sm:gap-8 flex flex-col justify-center items-start w-full">
			<div>
				<span className="text-2xl sm:text-3xl font-semibold tracking-tight">
					My Library
				</span>
			</div>
			<div className="w-full">
				<div className="w-full">
					<div className="flex items-center justify-items-start gap-6 font-semibold text-gray-600 border-b border-b-gray-400 w-full pl-2 text-xs sm:text-base">
						<div
							className={clsx("cursor-pointer pb-2", {
								"border-b-3 border-blue-500 text-black":
									section === "All Books",
							})}
							onClick={handleSectionClick}
						>
							All Books
						</div>
						<div
							className={clsx("cursor-pointer pb-2", {
								"border-b-3 border-blue-500 text-black":
									section === "Plan to Read",
							})}
							onClick={handleSectionClick}
						>
							Plan to Read
						</div>
						<div
							className={clsx("cursor-pointer pb-2", {
								"border-b-3 border-blue-500 text-black":
									section === "Reading",
							})}
							onClick={handleSectionClick}
						>
							Reading
						</div>
						<div
							className={clsx("cursor-pointer pb-2", {
								"border-b-3 border-blue-500 text-black":
									section === "Finished",
							})}
							onClick={handleSectionClick}
						>
							Finished
						</div>
					</div>
					<div className="mt-4 flex gap-2 flex-wrap">
						{books.map((book) => {
							if (
								section === "All Books" ||
								section === book.status
							) {
								return (
									<Book
										key={book.id}
										id={book.id}
										src={book.src}
										title={book.title}
										authors={book.authors}
										changeStatus={changeStatus}
										status={book.status}
										handleBookRemove={handleBookRemove}
									/>
								);
							}
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
