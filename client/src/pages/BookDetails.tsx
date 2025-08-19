import { useNavigate, useParams } from "react-router-dom";
import type { BookStatus } from "./Library";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import StarIcon from "@mui/icons-material/Star";
import ReactShowMoreText from "react-show-more-text";
import Button from "@/components/Button";

interface Book {
	id: string;
	added: boolean;
	status?: BookStatus;
	title: string;
	authors: string[];
	publisher: string;
	publishedDate: string;
	description: string;
	industryIdentifiers: {
		type: string;
		identifier: string;
	}[];
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
	industryIdentifiers: [
		{
			type: "ISBN_10",
			identifier: "0618260307",
		},
		{
			type: "ISBN_13",
			identifier: "9780618260300",
		},
	],
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

function languageNames(code: string) {
	const language = new Intl.DisplayNames(["en"], {
		type: "language",
	});

	return language.of(code);
}

export default function BookDetails() {
	const { bookId } = useParams();
	const navigate = useNavigate();

	function back() {
		navigate(-1);
	}

	return (
		<div className="grid md:grid-cols-[minmax(200px,_auto)_1fr] px-6 pt-7 gap-12 grid-cols-1">
			<div className="overflow-y-hidden flex justify-center flex-col md:justify-start items-center pt-2 gap-2">
				<img
					src={book.imageLinks.thumbnail}
					alt={book.title}
					className="w-60 rounded-lg"
				/>
				<Button classname="bg-blue-500 text-white mt-7 md:mt-3 hover:bg-blue-500/90">
					Add to My Library
				</Button>
				<Button onClick={back}>Go Back</Button>
			</div>
			<div className="overflow-y-auto flex flex-col items-start sm:pr-20">
				<h1 className="text-3xl font-semibold">{book.title}</h1>
				<span className="mt-2 p-1 text-gray-600 font-normal mb-4">
					by {book.authors.join(", ")}
				</span>
				<div>
					<div className="text-gray-500 text-sm flex items-center gap-1 font-medium">
						<StarIcon style={{ color: "#f7d52a" }} />{" "}
						{book.averageRating} ({book.ratingsCount})
					</div>
					{book.added && <div>{book?.status}</div>}
				</div>
				<div className="mt-3 flex gap-3 flex-wrap text-sm mb-6">
					{book.categories.map((category) => (
						<div className="bg-gray-200 text-gray-700 font-medium px-2 rounded-lg py-1">
							{category}
						</div>
					))}
				</div>
				<ReactShowMoreText
					lines={4}
					more="Show more"
					less="Show less"
					anchorClass="cursor-pointer text-blue-500"
				>
					<p
						dangerouslySetInnerHTML={{ __html: book.description }}
						className="text-gray-800 text-justify"
					></p>
				</ReactShowMoreText>
				<div className="w-full pb-8 mt-3">
					<Table>
						<TableBody>
							<TableRow>
								<TableCell
									className="text-xl font-semibold pb-4"
									colSpan={2}
								>
									Publication Info
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-gray-800 py-4">
									Publisher
								</TableCell>
								<TableCell>{book.publisher}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-gray-800 py-4">
									Publication Date
								</TableCell>
								<TableCell>{book.publishedDate}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-gray-800 py-4">
									Pages
								</TableCell>
								<TableCell>{book.pageCount}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-gray-800 py-4">
									Language
								</TableCell>
								<TableCell>
									{languageNames(book.language) ||
										book.language}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-gray-800 py-4">
									Dimensions
								</TableCell>
								<TableCell>{`${book.dimensions.height} x ${book.dimensions.width} x ${book.dimensions.thickness}`}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
