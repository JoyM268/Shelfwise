import axios from "axios";
import axiosInstance from "@/api/config";
import { useEffect, useState } from "react";
import type { Book, BookId } from "@/types";

export default function useBook(bookId: BookId) {
	const [book, setBook] = useState<Book | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const url = `/api/books/${bookId}`;
		const controller = new AbortController();
		let isCancelled = false;

		async function getBook() {
			setLoading(true);
			setError(null);
			try {
				const res = await axiosInstance.get<Book>(url, {
					signal: controller.signal,
				});
				setBook(res.data);
			} catch (err) {
				if (axios.isCancel(err)) {
					isCancelled = true;
				} else {
					setError(
						"An error occured while loading the data, please try again later."
					);
				}
			} finally {
				if (!isCancelled) setLoading(false);
			}
		}

		getBook();

		return () => controller.abort();
	}, [bookId]);

	return { loading, error, book };
}
