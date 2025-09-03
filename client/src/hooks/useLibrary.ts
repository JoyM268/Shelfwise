import axios from "axios";
import { useState, useEffect } from "react";
import type { BookDataProps, BookStatus } from "@/types";
import library from "@/api/library";
import { toast } from "sonner";

export default function useLibrary() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [books, setBooks] = useState<null | BookDataProps[]>(null);

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

	async function handleBookRemove(id: string) {
		const newBooks = books && books.filter((book) => book.id !== id);
		try {
			await library.deleteBook(id);
			setBooks(newBooks);
			toast.success("The book has been removed from library.");
		} catch {
			toast.error("Could not remove the book. Please try again.");
		}
	}

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
			toast.success(`The book has been added to '${status}'.`);
		} catch {
			toast.error("Failed to update book status. Please try again.");
		}
	}

	return { books, loading, error, handleBookRemove, changeStatus };
}
