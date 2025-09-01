import axiosInstance from "@/api/config";
import axios from "axios";
import { useEffect, useState } from "react";
import type { BookData } from "@/types";

export default function useBookCarousel(search_query: string) {
	const [books, setBooks] = useState<BookData[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		let url: string;
		if (search_query === "top") {
			url = "/api/books/top/";
		} else {
			url = `/api/books/genre?q=${search_query}`;
		}

		const controller = new AbortController();
		let isCancelled = false;

		async function getBooks() {
			setLoading(true);
			setError(null);
			try {
				const res = await axiosInstance.get<BookData[]>(url, {
					signal: controller.signal,
				});

				setBooks(res.data);
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

		getBooks();

		return () => controller.abort();
	}, [search_query]);

	return { books, loading, error };
}
