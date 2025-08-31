import { TextTruncate } from "./ui/text-truncate";
import type { BookDescriptionProps } from "@/types";

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
