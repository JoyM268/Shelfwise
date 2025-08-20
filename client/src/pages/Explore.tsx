import PerfectScrollbar from "react-perfect-scrollbar";
import BookCarousel from "@/components/BookCarousel";
import Search from "@/components/Search";
import { useRef, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import Tilt from "react-parallax-tilt";

interface ExploreProps {
	handleSearch(event: ChangeEvent<HTMLInputElement>): void;
	search: string;
	results: boolean;
	showResults(): void;
}

const genres = [
	{ name: "Fiction", src: "fiction" },
	{ name: "Fantasy", src: "fantasy" },
	{ name: "Science Fiction", src: "science fiction" },
	{ name: "Mystery", src: "mystery" },
	{ name: "Thriller", src: "thriller" },
	{ name: "Romance", src: "romance" },
	{ name: "Horror", src: "horror" },
	{ name: "Historical Fiction", src: "historical fiction" },
	{ name: "Young Adult", src: "young adult" },
	{ name: "Children's Fiction", src: "childrens fiction" },
	{ name: "Non-Fiction", src: "nonfiction" },
	{ name: "Biography", src: "biography" },
	{ name: "History", src: "history" },
	{ name: "Science", src: "science" },
	{ name: "Business", src: "business" },
	{ name: "Self-Help", src: "self help" },
	{ name: "Cooking", src: "cooking" },
	{ name: "Travel", src: "travel" },
	{ name: "Psychology", src: "psychology" },
];

export default function Explore({
	search,
	handleSearch,
	results,
	showResults,
}: ExploreProps) {
	const refs = useRef<Record<string, HTMLDivElement | null>>({});

	function handleGenreClick(src: string) {
		const targetRef = refs.current[src];
		if (targetRef) {
			targetRef.scrollIntoView({ behavior: "smooth" });
		}
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (search) {
			showResults();
		}
	}

	return (
		<div className="px-6 pb-6 pt-5 w-full max-w-[1300px] mx-auto">
			<form onSubmit={handleSubmit}>
				<Search search={search} handleSearch={handleSearch} />
			</form>
			<AnimatePresence>
				{results && (
					<motion.div
						className="mt-7"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 330 }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.6 }}
					>
						<BookCarousel title="Search Results" />
					</motion.div>
				)}
			</AnimatePresence>
			<div className="mt-6 sm:mt-7 mb-6">
				<span className="font-semibold text-xl pl-2">
					Explore by Genre
				</span>
				<PerfectScrollbar>
					<div className="px-2 mt-4 grid grid-flow-col auto-cols-min gap-4 pb-4">
						{genres.map((genre) => (
							<div key={genre.src}>
								<Tilt tiltReverse={true}>
									<div
										className="w-32 sm:w-36 h-32 sm:h-36 rounded-lg cursor-pointer mb-2 bg-cover"
										style={{
											backgroundImage: `url("/genres/${genre.src}.png")`,
										}}
										onClick={() =>
											handleGenreClick(genre.src)
										}
									></div>
								</Tilt>
								<span className="pl-1 font-semibold">
									{genre.name}
								</span>
							</div>
						))}
					</div>
				</PerfectScrollbar>
			</div>
			{genres.map((genre, index) => (
				<div
					key={genre.src}
					ref={(ele: HTMLDivElement | null) => {
						refs.current[genre.src] = ele;
					}}
					className={`${
						index === genres.length - 1 ? "mt-4 pb-12" : "mt-4"
					} scroll-mt-24`}
				>
					<BookCarousel title={genre.name} />
				</div>
			))}
		</div>
	);
}
