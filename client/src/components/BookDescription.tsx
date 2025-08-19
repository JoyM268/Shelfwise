import { TextTruncate } from "./ui/text-truncate";

interface BookDescriptionProps {
	description: string;
	lines: number;
}

export default function BookDescription({
	description,
	lines,
}: BookDescriptionProps) {
	return (
		<TextTruncate maxLines={lines}>
			<p
				dangerouslySetInnerHTML={{ __html: description }}
				className="text-gray-800 text-justify"
			></p>
		</TextTruncate>
	);
}
