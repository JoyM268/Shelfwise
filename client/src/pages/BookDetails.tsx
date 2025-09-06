import { NavLink, useNavigate, useParams } from "react-router-dom";
import Rating from "@/components/Rating";
import Button from "@/components/Button";
import PublicationInfo from "@/components/PublicationInfo";
import BookDescription from "@/components/BookDescription";
import BookCategory from "@/components/BookCategory";
import { RadioDialog } from "@/components/RadioDialog";
import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import BookRemoveWarning from "@/components/BookRemoveWarning";
import BookDetailsSkeleton from "@/components/skeleton/BookDetailsSkeleton";
import { useAuth } from "@/hooks/useAuth";
import library from "@/api/library";
import useBook from "@/hooks/useBook";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import useProgress from "@/hooks/useProgress";
import useStatus from "@/hooks/useStaus";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function BookDetails() {
	const { bookId } = useParams();
	const { loading, error, book } = useBook(bookId);
	const navigate = useNavigate();
	const [alert, setAlert] = useState(false);
	const { user } = useAuth();
	const { progress, setProgress, inputValue, setInputValue } = useProgress(
		book?.progress
	);
	const { status, setStatus } = useStatus(book?.status);
	const inputRef = useRef<HTMLInputElement>(null);

	function back() {
		navigate(-1);
	}

	async function removeBook() {
		try {
			if (bookId) {
				await library.deleteBook(bookId);
				setStatus("");
				toast.success("The book has been removed from library.");
			}
		} catch {
			toast.error("Could not remove the book. Please try again.");
		}
	}

	async function handleStartReading() {
		if (bookId) {
			try {
				await library.changeStatus(bookId, "Reading");
				setStatus("Reading");
				setProgress(0);
				setInputValue(0);
				toast.success("The book has been added to 'Reading'");
			} catch {
				toast.error(`An error occured, please try again later.`);
			}
		}
	}

	async function handleProgress(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (inputRef.current) inputRef.current.blur();
		if (bookId) {
			try {
				if (inputValue !== progress) {
					if (inputValue === book?.pageCount) {
						await library.changeStatus(bookId, "Finished");
						setStatus("Finished");
					} else {
						await library.changeStatus(
							bookId,
							"Reading",
							inputValue
						);
						setProgress(inputValue);
					}
					toast.success("Reading progress successfully updated");
				}
			} catch {
				toast.error(`An error occured, please try again later.`);
			}
		}
	}

	async function handleUnread() {
		if (bookId) {
			try {
				await library.changeStatus(bookId, "Plan to Read");
				setStatus("Plan to Read");
				setProgress(0);
				setInputValue(0);
				toast.success("The book has been marked as 'Unread'");
			} catch {
				toast.error(`An error occured, please try again later.`);
			}
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
			{!loading && !error && book && bookId && (
				<>
					<BookRemoveWarning
						alert={alert}
						setAlert={setAlert}
						id={bookId}
						handleBookRemove={() => removeBook()}
					/>
					<div className="grid md:grid-cols-[minmax(200px,_auto)_1fr] px-6 pt-1 gap-8 md:gap-12 grid-cols-1">
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
									<Button classname="bg-blue-500 text-white mt-1 md:mt-1 hover:bg-blue-500/90 text-sm">
										Login to Track Book
									</Button>
								</NavLink>
							)}

							{user && (
								<>
									<RadioDialog
										value={status}
										onValueChange={setStatus}
										title={
											status
												? "Edit Status"
												: "Add to Library"
										}
										description="Choose the status of the book"
										setProgress={setProgress}
										setInputValue={setInputValue}
									>
										<Button classname="bg-blue-500 text-white mt-5 md:mt-3 hover:bg-blue-500/90 text-sm">
											{status
												? "Edit Status"
												: "Add to My Library"}
										</Button>
									</RadioDialog>
									{status && (
										<Button
											classname="bg-red-500 text-white hover:bg-red-500/90 text-sm"
											onClick={() => setAlert(true)}
										>
											Remove from Library
										</Button>
									)}
								</>
							)}
							<Button
								onClick={back}
								classname="bg-gray-200/90 text-gray-800 hover:bg-gray-200/80 text-sm"
							>
								Go Back
							</Button>
							{status && (
								<div className="border border-gray-300/80 w-full mt-2 rounded-md shadow-gray-500 px-2 py-3 bg-gray-100/50 md:mb-4">
									{status == "Plan to Read" && (
										<>
											<div className="flex text-sm items-center gap-3">
												<div className="text-blue-500 p-1.5 bg-blue-500/10 rounded-full">
													<BookmarkBorderIcon />
												</div>
												<span className="font-semibold text-gray-800">
													Plan to Read
												</span>
											</div>
											<p className="text-gray-700 text-xs mt-3.5 text-wrap">
												You haven't started this book
												yet. Ready to dive in?
											</p>
											<button
												className="flex items-center justify-center w-full text-xs gap-1.5 mt-4 bg-blue-500 hover:bg-blue-500/95 text-white py-1.5 rounded-lg cursor-pointer"
												onClick={handleStartReading}
											>
												<PlayCircleOutlineIcon />
												<div className="font-semibold">
													Start Reading
												</div>
											</button>
										</>
									)}
									{status === "Reading" && (
										<>
											<span className="text-sm font-semibold tracking-wide">
												Reading Progress
											</span>
											<div className="flex justify-between text-xs mt-1 mb-3">
												<span className="text-gray-700">
													Pages Completed
												</span>
												<span className="font-semibold">{`${progress}/${book.pageCount}`}</span>
											</div>
											<Progress
												value={
													(progress /
														book.pageCount) *
													100
												}
											/>
											<form
												className="flex gap-4 mt-4 items-center"
												onSubmit={handleProgress}
											>
												<Input
													ref={inputRef}
													value={inputValue}
													className="text-xs"
													onChange={(e) => {
														if (
															!isNaN(
																Number(
																	e.target
																		.value
																)
															) &&
															Number(
																e.target.value
															) <= book.pageCount
														)
															setInputValue(
																Number(
																	e.target
																		.value
																)
															);
													}}
												/>
												<Button
													classname="bg-blue-500 text-white text-xs py-2.5 hover:bg-blue-500/95"
													type="submit"
												>
													Update
												</Button>
											</form>{" "}
										</>
									)}
									{status === "Finished" && (
										<>
											<div className="text-sm flex items-center gap-2">
												<div className="text-green-600 text-sm p-1.5 bg-green-500/10 rounded-full">
													<CheckCircleOutlineIcon />
												</div>
												<span className="font-semibold">
													Finished
												</span>
											</div>
											<p className="text-gray-700 text-xs mt-3.5 text-wrap">
												You finished this book. Great
												job!
											</p>
											<button
												className="flex items-center justify-center w-full text-xs gap-2 mt-5 bg-green-600 hover:bg-green-600/95 text-white py-1.5 rounded-lg cursor-pointer mb-2"
												onClick={handleUnread}
											>
												<MenuBookIcon />
												<div className="font-semibold">
													Mark as Unread
												</div>
											</button>
										</>
									)}
								</div>
							)}
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
