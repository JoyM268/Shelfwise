import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useMemo } from "react";

interface ProfilePhotoProps {
	name: string;
	imgSrc?: string;
	imgAlt?: string;
}

export default function ProfilePhoto({
	name,
	imgSrc,
	imgAlt,
}: ProfilePhotoProps) {
	const fallback = useMemo(() => {
		return name
			.split(" ")
			.map((word) => word[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	}, [name]);

	return (
		<Avatar className="cursor-pointer w-9 h-9 border border-gray-400 shadow">
			<AvatarImage src={imgSrc} alt={imgAlt} />
			<AvatarFallback>{fallback}</AvatarFallback>
		</Avatar>
	);
}
