import { NavLink, useNavigate, useParams } from "react-router-dom";
import Rating from "@/components/Rating";
import Button from "@/components/Button";
import PublicationInfo from "@/components/PublicationInfo";
import BookDescription from "@/components/BookDescription";
import BookCategory from "@/components/BookCategory";
import { RadioDialog } from "@/components/RadioDialog";
import { useState } from "react";
import { toast } from "sonner";
import BookRemoveWarning from "@/components/BookRemoveWarning";
import BookDetailsSkeleton from "@/components/skeleton/BookDetailsSkeleton";
import { useAuth } from "@/hooks/useAuth";
import library from "@/api/library";
import useBook from "@/hooks/useBook";

export default function BookDetails() {
	const { bookId } = useParams();
	const { loading, error, book } = useBook(bookId);
	const navigate = useNavigate();
	const [alert, setAlert] = useState(false);
	const { user } = useAuth();
	const [bookStatus, setBookStatus] = useState<string>(book?.status || "");

	function back() {
		navigate(-1);
	}

	async function removeBook() {
		try {
			if (bookId) {
				await library.deleteBook(bookId);
				setBookStatus("");
				toast("The book has been removed from library.");
			}
		} catch {
			toast.error("Could not remove the book. Please try again.");
		}
	}

	return (
		<>
			{loading && <BookDetailsSkeleton />}
			{error && (
				<div className="text-red-500 mx-auto text-center flex items-center justify-center h-full sm:-m-20 -m-30 px-10">
					{error}
				</div>
			)}
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

							{!user && (
								<NavLink className="w-full" to="/login">
									<Button classname="bg-blue-500 text-white mt-1 md:mt-1 hover:bg-blue-500/90">
										Login to Track Book
									</Button>
								</NavLink>
							)}

							{user && (
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
