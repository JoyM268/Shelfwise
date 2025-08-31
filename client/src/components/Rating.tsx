import StarIcon from "@mui/icons-material/Star";
import type { RatingProps } from "@/types";

export default function Rating({ rating, ratingsCount }: RatingProps) {
	return (
		<div className="text-gray-500 text-sm flex items-center gap-1 font-medium">
			<StarIcon style={{ color: "#f7d52a" }} />{" "}
			{rating ? rating : "Not Available"}{" "}
			{rating && ratingsCount && `(${ratingsCount})`}
		</div>
	);
}
