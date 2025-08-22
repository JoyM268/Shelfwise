import { useEffect, useState } from "react";
import Book from "./Book";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import BookSkeleton from "./skeleton/BookSkeleton";

interface BookCarouselProps {
	title: string;
	search_query: string;
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
}: BookCarouselProps) {
	const [books, setBooks] = useState<BookData[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		let url: string;
		if (search_query === "top") {
			url = "http://127.0.0.1:8000/api/books/top/";
		} else {
			url = `http://127.0.0.1:8000/api/books/genre?q=${search_query}`;
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
			} catch {
				setError(
					"An error occured while loading the data, please try again later."
				);
			} finally {
				setLoading(false);
			}
		}

		getBooks();
	}, [search_query]);

	return (
		<div className="flex flex-col gap-2">
			<span className="font-semibold text-xl pl-3">{title}</span>
			{!error && (
				<PerfectScrollbar options={{ suppressScrollY: true }}>
					<div className="grid grid-flow-col auto-cols-min pb-2 px-1 relative">
						{!loading &&
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

						{loading &&
							[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ele) => {
								return <BookSkeleton key={ele} />;
							})}
					</div>
				</PerfectScrollbar>
			)}

			{error && (
				<div className="min-h-52 text-red-500 flex justify-center items-center text-center">
					{error}
				</div>
			)}
		</div>
	);
}
