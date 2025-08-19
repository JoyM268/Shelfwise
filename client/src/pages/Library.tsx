import { useState } from "react";
import type { MouseEvent } from "react";
import { clsx } from "clsx";
import Book from "@/components/Book";
import EmptyMessage from "@/components/EmptyMessage";
import { toast } from "sonner";

export type BookStatus = "Reading" | "Plan to Read" | "Finished";

interface BookDataProps {
	id: string;
	src: string;
	title: string;
	authors: string[];
	status: BookStatus;
	progress: number;
	total: number;
	description: string;
}

const bookData: BookDataProps[] = [
	{
		id: "1",
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
		status: "Reading",
		progress: 0,
		total: 200,
		description: "Hello World",
	},
	{
		id: "2",
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "Hello",
		authors: ["Ayman Elmassarawy"],
		status: "Plan to Read",
		progress: 0,
		total: 200,
		description: "Hello World",
	},
	{
		id: "3",
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
	const count: [number, number, number] = [0, 0, 0];
	const tabs = ["All Books", "Plan to Read", "Reading", "Finished"];

	function changeStatus(id: string, status: BookStatus) {
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
		toast(`The book has been added to '${status}'.`);
	}

	function handleSectionClick(event: MouseEvent<HTMLDivElement>) {
		event.preventDefault();
		const text = event.currentTarget.innerText;
		if (text !== section) {
			setSection(text);
			console.log(text);
		}
	}

	function handleBookRemove(id: string) {
		const newBooks = books.filter((book) => book.id !== id);
		setBooks(newBooks);
		toast("The book has been removed from library.");
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
						{tabs.map((tab) => (
							<div
								className={clsx("cursor-pointer pb-2", {
									"border-b-3 border-blue-500 text-black":
										section === tab,
								})}
								onClick={handleSectionClick}
							>
								{tab}
							</div>
						))}
					</div>
					<div className="mt-4 flex gap-2 flex-wrap">
						{books.map((book) => {
							if (book.status === "Plan to Read") {
								count[0]++;
							} else if (book.status === "Reading") {
								count[1]++;
							} else {
								count[2]++;
							}

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

						{section === "All Books" &&
							count[0] + count[1] + count[2] === 0 && (
								<EmptyMessage
									title="Your Library is Empty"
									description="Start adding books to track your reading progress and
					discover new favorites"
								/>
							)}

						{section === "Plan to Read" && count[0] === 0 && (
							<EmptyMessage
								title="Your Next Adventure Awaits"
								description="Start Exploring to find and save books you're excited to read next."
							/>
						)}

						{section === "Reading" && count[1] === 0 && (
							<EmptyMessage
								title="You Are Not Currently Reading Any Books"
								description="Explore thousands of titles and choose a book to start reading today."
							/>
						)}

						{section === "Finished" && count[2] === 0 && (
							<EmptyMessage
								title="You Have Not Completed Any Book Yet."
								description="Every book you complete will appear here. Mark a book as 'finished' to add it to your accomplishments."
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
