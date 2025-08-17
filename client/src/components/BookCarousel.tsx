import Book from "./Book";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const books = [
	{
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
	{
		src: "http://books.google.com/books/content?id=9Y91EQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
		title: "How to Influence Others and Earn Their Trust",
		authors: ["Ayman Elmassarawy"],
	},
];

export default function BookCarousel({ title }: { title: string }) {
	return (
		<div className="flex flex-col gap-3">
			<span className="font-semibold text-xl pl-2">{title}</span>
			<PerfectScrollbar options={{ suppressScrollY: true }}>
				<div className="grid grid-flow-col auto-cols-min pb-2 px-1 relative">
					{books.map((book, index) => (
						<Book
							key={index}
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
