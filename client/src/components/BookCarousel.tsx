import { useEffect, useState } from "react";
import Book from "./Book";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

interface BookCarouselProps {
	title: string;
	search_query: string;
	search: boolean;
}

interface BookData {
	id: string;
	src: {
		smallThumbnail: string;
		thumbnail: string;
	};
	title: string;
	authors: string[];
}

export default function BookCarousel({
	title,
	search_query,
	search = false,
}: BookCarouselProps) {
	const [books, setBooks] = useState<BookData[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		let url: string;
		if (search_query === "top") {
			url = "http://127.0.0.1:8000/api/books/top/";
		} else if (!search) {
			url = `http://127.0.0.1:8000/api/books/genre?q=${search_query}`;
		} else {
			url = `http://127.0.0.1:8000/api/books?q=${search_query}`;
		}

		async function getBooks() {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(url);
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				const data = await res.json();

				setBooks(data);
			} catch (err) {
				setError(err as string);
			} finally {
				setLoading(false);
			}
		}

		getBooks();
	}, []);

	return (
		<div className="flex flex-col gap-2">
			<span className="font-semibold text-xl pl-3">{title}</span>
			<PerfectScrollbar options={{ suppressScrollY: true }}>
				<div className="grid grid-flow-col auto-cols-min pb-2 px-1 relative">
					{!loading &&
						!error &&
						books &&
						books.map((book) => {
							if (book.src) {
								return (
									<Book
										id={book.id}
										key={book.id}
										src={book.src?.thumbnail}
										title={book.title}
										authors={book.authors}
									/>
								);
							}
						})}
				</div>
			</PerfectScrollbar>
		</div>
	);
}
