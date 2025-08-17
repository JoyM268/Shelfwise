import { NavLink, useNavigate } from "react-router-dom";
import { useRef, type ChangeEvent, type FormEvent } from "react";
import Search from "../components/Search";
import Book from "../components/Book";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

interface HomeProps {
	isAuthenticated: boolean;
	handleSearch(event: ChangeEvent<HTMLInputElement>): void;
	search: string;
}

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

export default function Home({
	isAuthenticated,
	handleSearch,
	search,
}: HomeProps) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		navigate("/explore");
	}

	return (
		<div className="h-screen pt-20 p-6 mx-auto flex items-center flex-col flex-1 max-w-[1350px] gap-4">
			<div
				className="rounded-xl sm:max-w-11/12 max-h-fit shadow text-center py-16 px-9 flex flex-col items-center gap-4 sm:gap-6 bg-no-repeat bg-center bg-cover text-white relative select-none mt-3"
				style={{
					backgroundImage: 'url("/books.png")',
				}}
			>
				<div className="absolute inset-0 bg-black/60 rounded-xl"></div>
				<span className=" relative text-3xl sm:text-5xl font-semibold tracking-tight text-shadow-black">
					Welcome to Shelfwise, your personal reading universe.
				</span>
				<p className="text-sm sm:text-lg sm:leading-tight tracking-tight sm:tracking-tighter text-shadow-black relative">
					Catalog your library, track your progress on any book, and
					explore millions of titles to find your next great read.
				</p>
				<NavLink
					to={isAuthenticated ? "/library" : "/login"}
					className="bg-blue-500 px-4 rounded-xl text-white py-3 text-sm font-semibold mt-1 shadow-blue-200 relative"
				>
					{isAuthenticated ? "View My Bookshelf" : "Get Started"}
				</NavLink>
			</div>
			<form
				className="relative sm:min-w-11/12 sm:max-w-11/12 w-full"
				onSubmit={handleSubmit}
			>
				<Search search={search} handleSearch={handleSearch} />
			</form>
			<div className="sm:min-w-11/12 sm:max-w-11/12 w-full mt-3 font-semibold text-xl pl-2 flex flex-col gap-3 pb-6">
				<span>Recently Published</span>
				<PerfectScrollbar>
					<div
						className="grid grid-flow-col auto-cols-min gap-2.5 pb-4 px-1 relative"
						ref={scrollRef}
					>
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
		</div>
	);
}
