import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { clsx } from "clsx";
import Book from "@/components/Book";
import EmptyMessage from "@/components/EmptyMessage";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";
import library from "@/api/library";
import axios from "axios";

export type BookStatus = "Reading" | "Plan to Read" | "Finished";

export interface BookDataProps {
	id: string;
	src: string;
	title: string;
	authors: string[];
	status: BookStatus;
	progress: number;
	total: number;
}

export default function Library() {
	const [section, setSection] = useState("All Books");
	const [books, setBooks] = useState<null | BookDataProps[]>(null);
	const count: [number, number, number] = [0, 0, 0];
	const tabs = ["All Books", "Plan to Read", "Reading", "Finished"];
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		const controller = new AbortController();
		let isCanceled = false;

		async function getLibrary() {
			setLoading(true);
			setError(null);

			try {
				const res = await library.getBooks(controller.signal);
				setBooks(res);
			} catch (err) {
				if (axios.isCancel(err)) {
					isCanceled = true;
				} else {
					setError("An error occured, please try again later.");
				}
			} finally {
				if (!isCanceled) setLoading(false);
			}
		}

		getLibrary();

		return () => controller.abort();
	}, []);

	async function changeStatus(id: string, status: BookStatus) {
		const newBooks =
			books &&
			books.map((book) => {
				if (book.id === id) {
					return {
						...book,
						status,
					};
				}
				return book;
			});

		try {
			await library.changeStatus(id, status);
			setBooks(newBooks);
			toast(`The book has been added to '${status}'.`);
		} catch {
			toast.error("Failed to update book status. Please try again.");
		}
	}

	function handleSectionClick(event: MouseEvent<HTMLDivElement>) {
		event.preventDefault();
		const text = event.currentTarget.innerText;
		if (text !== section) {
			setSection(text);
		}
	}

	async function handleBookRemove(id: string) {
		const newBooks = books && books.filter((book) => book.id !== id);
		try {
			await library.deleteBook(id);
			setBooks(newBooks);
			toast("The book has been removed from library.");
		} catch {
			toast.error("Could not remove the book. Please try again.");
		}
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
								key={tab}
							>
								{tab}
							</div>
						))}
					</div>

					{loading && (
						<div className="flex justify-center items-center h-full sm:mt-48 mt-36">
							<Loader />
						</div>
					)}
					{error && (
						<div className="h-full sm:mt-52 mt-36 p-4 text-center text-red-500">
							{error}
						</div>
					)}
					{!loading && !error && books && (
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
					)}
				</div>
			</div>
		</div>
	);
}
