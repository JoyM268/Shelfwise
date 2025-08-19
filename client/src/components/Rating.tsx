import StarIcon from "@mui/icons-material/Star";

interface RatingProps {
	rating: number;
	ratingsCount: number;
}

export default function Rating({ rating, ratingsCount }: RatingProps) {
	return (
		<div className="text-gray-500 text-sm flex items-center gap-1 font-medium">
			<StarIcon style={{ color: "#f7d52a" }} /> {rating} ({ratingsCount})
		</div>
	);
}
