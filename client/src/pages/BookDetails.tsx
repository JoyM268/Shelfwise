import { NavLink, useNavigate, useParams } from "react-router-dom";
import type { BookStatus } from "./Library";
import Rating from "@/components/Rating";
import Button from "@/components/Button";
import PublicationInfo from "@/components/PublicationInfo";
import BookDescription from "@/components/BookDescription";
import BookCategory from "@/components/BookCategory";
import { RadioDialog } from "@/components/RadioDialog";
import { useState } from "react";
import { toast } from "sonner";
import BookRemoveWarning from "@/components/BookRemoveWarning";

interface Book {
	id: string;
	added: boolean;
	status?: BookStatus;
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

const book: Book = {
	id: "ljWL5A7D2JAC",
	added: true,
	title: "The Hobbit, Or, There and Back Again",
	authors: ["John Ronald Reuel Tolkien"],
	publisher: "Houghton Mifflin",
	publishedDate: "2001",
	description:
		"\u003ci\u003eIn a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.\u003cbr\u003e\u003c/i\u003eWritten for J.R.R. Tolkien’s own children, \u003ci\u003eThe Hobbit\u003c/i\u003e met with instant critical acclaim when it was first published in 1937. Now recognized as a timeless classic, this introduction to the hobbit Bilbo Baggins, the wizard Gandalf, Gollum, and the spectacular world of Middle-earth recounts of the adventures of a reluctant hero, a powerful and dangerous ring, and the cruel dragon Smaug the Magnificent. The text in this 372-page paperback edition is based on that first published in Great Britain by Collins Modern Classics (1998), and includes a note on the text by Douglas A. Anderson (2001). Unforgettable!\u003cbr\u003e",
	isbn: "0618260307",
	pageCount: 365,
	dimensions: {
		height: "20.00 cm",
		width: "13.20 cm",
		thickness: "2.20 cm",
	},
	categories: ["Juvenile Fiction", "Classics", "Fantasy & Magic"],
	averageRating: 4.5,
	ratingsCount: 25,
	imageLinks: {
		smallThumbnail:
			"http://books.google.com/books/content?id=ljWL5A7D2JAC&printsec=frontcover&img=1&zoom=5&imgtk=AFLRE70kX2Op1ErOcrWBfV-5bXvq4qsSu8UIgnZssSnS5eUMdrq6ewJM_-GGBEWt48_95CcC5dZBptfE_LtoPQk21dxB-6cUByK1yWnNWjU_tDddgWyNJNiGpxisMcZvnqOhdSQmP64k&source=gbs_api",
		thumbnail:
			"http://books.google.com/books/content?id=ljWL5A7D2JAC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71rSkIppHap-U9QaVymg5FKHKSO00Je3-zNTbi8hywdNvnSvCzj47ndZaG26xUn8O6UMCd-Lk9-k6_f1K8upt7ii0icAF7T1hvNvhLjySCPb8iiweWbh7WKWs4sZj8cip2SBk10&source=gbs_api",
	},
	language: "en",
};

export default function BookDetails({
	isAuthenticated,
}: {
	isAuthenticated: boolean;
}) {
	const { bookId } = useParams();
	const navigate = useNavigate();
	const [bookStatus, setBookStatus] = useState("");
	const [alert, setAlert] = useState(false);

	function back() {
		navigate(-1);
	}

	function removeBook() {
		setBookStatus("");
		toast("The book has been removed from library.");
	}

	return (
		<>
			<BookRemoveWarning
				alert={alert}
				setAlert={setAlert}
				id={bookId as string}
				handleBookRemove={() => removeBook()}
			/>
			<div className="grid md:grid-cols-[minmax(200px,_auto)_1fr] px-6 pt-7 gap-12 grid-cols-1">
				<div className="overflow-y-hidden flex justify-center flex-col md:justify-start items-center pt-2 gap-2">
					<img
						src={book.imageLinks.thumbnail}
						alt={book.title}
						className="w-50 sm:w-60 rounded-lg"
					/>

					{!isAuthenticated && (
						<NavLink className="w-full" to="/login">
							<Button classname="bg-blue-500 text-white mt-5 md:mt-3 hover:bg-blue-500/90">
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
					<h1 className="text-3xl font-semibold">{book.title}</h1>
					<span className="mt-2 p-1 text-gray-600 font-normal mb-4">
						by {book.authors.join(", ")}
					</span>
					<Rating
						rating={book.averageRating}
						ratingsCount={book.ratingsCount}
					/>
					<div className="mt-3 flex gap-3 flex-wrap text-sm mb-6">
						{book.categories.map((category) => (
							<BookCategory category={category} />
						))}
					</div>
					<BookDescription description={book.description} lines={4} />
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
	);
}
