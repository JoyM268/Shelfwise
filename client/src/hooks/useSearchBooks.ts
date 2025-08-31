import axiosInstance from "@/api/config";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { BookData } from "@/types";

export default function useSearchBooks(query: string | null) {
	const [books, setBooks] = useState<BookData[] | null>(null);
	const [searchLoading, setSearchLoading] = useState(false);
	const [searchError, setSearchError] = useState<null | string>(null);

	useEffect(() => {
		const controller = new AbortController();
		let isCancelled = false;

		async function getBooks() {
			setSearchLoading(true);
			setSearchError(null);

			try {
				const res = await axiosInstance.get(`/api/books?q=${query}`, {
					signal: controller.signal,
				});
				setBooks(res.data);
			} catch (err) {
				if (axios.isCancel(err)) {
					isCancelled = true;
				} else if (
					err instanceof AxiosError &&
					err.response?.data?.error === "Book Not Found"
				) {
					setSearchError("No results found.");
				} else {
					setSearchError("An error occured, please try again later.");
				}
			} finally {
				if (!isCancelled) setSearchLoading(false);
			}
		}

		if (query && query.trim()) {
			getBooks();
		}

		return () => controller.abort();
	}, [query]);

	return { books, loading: searchLoading, error: searchError };
}
