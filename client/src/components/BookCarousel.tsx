import Book from "./Book";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const books = [
	{
		id: 1,
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		id: 2,
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		id: 3,
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		id: 4,
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		id: 5,
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		id: 6,
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		id: 7,
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		id: 8,
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		id: 9,
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
];

export default function BookCarousel({ title }: { title: string }) {
	return (
		<div className="flex flex-col gap-2">
			<span className="font-semibold text-xl pl-3">{title}</span>
			<PerfectScrollbar options={{ suppressScrollY: true }}>
				<div className="grid grid-flow-col auto-cols-min pb-2 px-1 relative">
					{books.map((book) => (
						<Book
							id={book.id}
							key={book.id}
							src={book.src}
							title={book.title}
							authors={book.authors}
						/>
					))}
				</div>
			</PerfectScrollbar>
		</div>
	);
}
