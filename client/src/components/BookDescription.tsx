import ReactShowMoreText from "react-show-more-text";

interface BookDescriptionProps {
	description: string;
	lines: number;
}

export default function BookDescription({
	description,
	lines,
}: BookDescriptionProps) {
	return (
		<ReactShowMoreText
			lines={lines}
			more="Show more"
			less="Show less"
			anchorClass="cursor-pointer text-blue-500"
		>
			<p
				dangerouslySetInnerHTML={{ __html: description }}
				className="text-gray-800 text-justify"
			></p>
		</ReactShowMoreText>
	);
}
