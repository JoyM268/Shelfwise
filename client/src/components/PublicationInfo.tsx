import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface PublicationInfoProps {
	publisher: string;
	publishedDate: string;
	pageCount: number;
	language: string;
	dimensions: {
		height: string;
		width: string;
		thickness: string;
	};
}

function languageNames(code: string) {
	const language = new Intl.DisplayNames(["en"], {
		type: "language",
	});

	return language.of(code);
}

export default function PublicationInfo({
	publisher,
	publishedDate,
	pageCount,
	language,
	dimensions,
}: PublicationInfoProps) {
	return (
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
					<TableCell>{publisher}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="text-gray-800 py-4">
						Publication Date
					</TableCell>
					<TableCell>{publishedDate}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="text-gray-800 py-4">Pages</TableCell>
					<TableCell>{pageCount}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="text-gray-800 py-4">
						Language
					</TableCell>
					<TableCell>{languageNames(language) || language}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="text-gray-800 py-4">
						Dimensions
					</TableCell>
					<TableCell>{`${dimensions.height} x ${dimensions.width} x ${dimensions.thickness}`}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
