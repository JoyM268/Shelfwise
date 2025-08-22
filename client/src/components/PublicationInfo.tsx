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
	isbn: string;
}

export default function PublicationInfo({
	publisher,
	publishedDate,
	pageCount,
	language,
	dimensions,
	isbn,
}: PublicationInfoProps) {
	return (
		<Table>
			<TableBody>
				{(publisher ||
					publishedDate ||
					pageCount ||
					language ||
					dimensions ||
					isbn) && (
					<TableRow>
						<TableCell
							className="text-xl font-semibold pb-4"
							colSpan={2}
						>
							Publication Info
						</TableCell>
					</TableRow>
				)}
				{publisher && (
					<TableRow>
						<TableCell className="text-gray-600 py-4">
							Publisher
						</TableCell>
						<TableCell>{publisher}</TableCell>
					</TableRow>
				)}
				{isbn && (
					<TableRow>
						<TableCell className="text-gray-600 py-4">
							ISBN
						</TableCell>
						<TableCell>{isbn}</TableCell>
					</TableRow>
				)}
				{publishedDate && (
					<TableRow>
						<TableCell className="text-gray-600 py-4">
							Publication Date
						</TableCell>
						<TableCell>{publishedDate}</TableCell>
					</TableRow>
				)}
				{pageCount && (
					<TableRow>
						<TableCell className="text-gray-600 py-4">
							Pages
						</TableCell>
						<TableCell>{pageCount}</TableCell>
					</TableRow>
				)}
				{language && (
					<TableRow>
						<TableCell className="text-gray-600 py-4">
							Language
						</TableCell>
						<TableCell>{language}</TableCell>
					</TableRow>
				)}
				{dimensions &&
					dimensions.height &&
					dimensions.width &&
					dimensions.thickness && (
						<TableRow>
							<TableCell className="text-gray-600 py-4">
								Dimensions
							</TableCell>
							<TableCell>
								{`${dimensions.height} x ${dimensions.width} x ${dimensions.thickness}`}
							</TableCell>
						</TableRow>
					)}
			</TableBody>
		</Table>
	);
}
