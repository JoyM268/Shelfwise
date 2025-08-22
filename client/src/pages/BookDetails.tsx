import { NavLink, useNavigate, useParams } from "react-router-dom";
import Rating from "@/components/Rating";
import Button from "@/components/Button";
import PublicationInfo from "@/components/PublicationInfo";
import BookDescription from "@/components/BookDescription";
import BookCategory from "@/components/BookCategory";
import { RadioDialog } from "@/components/RadioDialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BookRemoveWarning from "@/components/BookRemoveWarning";
import { Skeleton } from "@/components/ui/skeleton";

interface Book {
	id: string;
	title: string;
	authors: string[];
	publisher: string;
	publishedDate: string;
	description: string;
	isbn: string;
	pageCount: number;
	dimensions: {
		height: string;
		width: string;
		thickness: string;
	};
	categories: string[];
	averageRating: number;
	ratingsCount: number;
	imageLinks: {
		smallThumbnail: string;
		thumbnail: string;
	};
	language: string;
}

export default function BookDetails({
	isAuthenticated,
}: {
	isAuthenticated: boolean;
}) {
	const { bookId } = useParams();
	const navigate = useNavigate();
	const [bookStatus, setBookStatus] = useState("");
	const [alert, setAlert] = useState(false);
	const [book, setBook] = useState<Book | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const url = `http://127.0.0.1:8000/api/books/${bookId}`;

		async function getBook() {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(url);
				if (!res.ok) {
					throw new Error("An error occured");
				}

				const data = await res.json();
				setBook(data);
			} catch (err) {
				console.log("Error:", err);
			} finally {
				setLoading(false);
			}
		}

		getBook();
	}, [bookId]);

	function back() {
		navigate(-1);
	}

	function removeBook() {
		setBookStatus("");
		toast("The book has been removed from library.");
	}

	return (
		<>
			{loading && (
				<div className="grid md:grid-cols-[minmax(200px,_auto)_1fr] px-6 mt-16 gap-12 grid-cols-1 pb-16">
					<div className="mx-auto w-full">
						<Skeleton className="h-90 w-60 rounded-lg mx-auto" />
						<Skeleton className="w-full mt-4 h-10" />
						<Skeleton className="w-full mt-3 h-10" />
					</div>
					<div className="sm:pr-20">
						<Skeleton className="w-full h-12" />
						<Skeleton className="w-full h-6 mt-4" />
						<Skeleton className="mt-4 h-4 w-2/6" />
						<div className="flex flex-wrap items-center mt-5 gap-2.5">
							{[1, 2, 3, 4].map((ele) => {
								return (
									<Skeleton
										key={ele}
										className="rounded-lg w-20 h-6"
									/>
								);
							})}
						</div>
						<Skeleton className="w-full h-28 mt-7" />
						<Skeleton className="h-72 mt-7" />
					</div>
				</div>
			)}
			{error && <div>{error}</div>}
			{!loading && !error && book && (
				<>
					<BookRemoveWarning
						alert={alert}
						setAlert={setAlert}
						id={bookId as string}
						handleBookRemove={() => removeBook()}
					/>
					<div className="grid md:grid-cols-[minmax(200px,_auto)_1fr] px-6 pt-7 gap-12 grid-cols-1">
						<div className="overflow-y-hidden flex justify-center flex-col md:justify-start items-center pt-2 gap-2">
							{book.imageLinks && book.imageLinks.thumbnail && (
								<img
									src={book.imageLinks.thumbnail}
									alt={book.title}
									className="h-90 w-60 rounded-lg"
								/>
							)}

							{(!book.imageLinks ||
								!book.imageLinks.thumbnail) && (
								<div className="h-90 w-60 rounded-lg flex justify-center items-center">
									Unable to Load the Image
								</div>
							)}

							{!isAuthenticated && (
								<NavLink className="w-full" to="/login">
									<Button classname="bg-blue-500 text-white mt-1 md:mt-1 hover:bg-blue-500/90">
										Login to Track Book
									</Button>
								</NavLink>
							)}

							{isAuthenticated && (
								<>
									<RadioDialog
										value={bookStatus}
										onValueChange={setBookStatus}
										title={
											bookStatus
												? "Edit Status"
												: "Add to Library"
										}
										description="Choose the status of the book"
									>
										<Button classname="bg-blue-500 text-white mt-5 md:mt-3 hover:bg-blue-500/90">
											{bookStatus
												? "Edit Status"
												: "Add to My Library"}
										</Button>
									</RadioDialog>
									{bookStatus && (
										<Button
											classname="bg-red-500 text-white hover:bg-red-500/90"
											onClick={() => setAlert(true)}
										>
											Remove from Library
										</Button>
									)}
								</>
							)}
							<Button onClick={back}>Go Back</Button>
						</div>
						<div className="overflow-y-auto flex flex-col items-start sm:pr-20">
							<h1 className="text-3xl font-semibold">
								{book.title}
							</h1>
							<span className="mt-2 p-1 text-gray-600 font-normal mb-4">
								by {book.authors.join(", ")}
							</span>
							<Rating
								rating={book.averageRating}
								ratingsCount={book.ratingsCount}
							/>
							<div className="mt-3 flex gap-3 flex-wrap text-sm mb-6">
								{book.categories.map((category) => (
									<BookCategory
										category={category}
										key={category}
									/>
								))}
							</div>
							<BookDescription
								description={book.description}
								lines={4}
							/>
							<div className="w-full pb-8 mt-5">
								<PublicationInfo
									publisher={book.publisher}
									publishedDate={book.publishedDate}
									dimensions={book.dimensions}
									pageCount={book.pageCount}
									language={book.language}
									isbn={book.isbn}
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
