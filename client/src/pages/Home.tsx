import { NavLink, useNavigate } from "react-router-dom";
import { type ChangeEvent, type FormEvent } from "react";
import Search from "@/components/Search";
import BookCarousel from "@/components/BookCarousel";
import { useAuth } from "@/context/useAuth";

interface HomeProps {
	handleSearch(event: ChangeEvent<HTMLInputElement>): void;
	search: string;
	showResults(): void;
}

export default function Home({ handleSearch, search, showResults }: HomeProps) {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (search) {
			navigate("/explore");
			showResults();
		}
	}

	return (
		<div className="px-6 pb-6 mx-auto flex items-center flex-col flex-1 max-w-[1350px] gap-4">
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
			<div className="sm:min-w-11/12 sm:max-w-11/12 w-full mt-5 pl-2 pb-8">
				<BookCarousel title="Top Books" search_query="top" />
			</div>
		</div>
	);
}
