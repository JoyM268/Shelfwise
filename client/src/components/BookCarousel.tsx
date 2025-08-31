import Book from "./Book";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import BookSkeleton from "./skeleton/BookSkeleton";
import type { BookCarouselProps } from "@/types";
import useBookCarousel from "@/hooks/useBookCarousel";

export default function BookCarousel({
	title,
	search_query,
}: BookCarouselProps) {
	const { books, loading, error } = useBookCarousel(search_query);

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
