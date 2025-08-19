import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function Button({
	onClick,
	classname = "text-gray-700 hover:bg-gray-300/90 bg-gray-300 ",
	children = "Button",
}: {
	onClick?: () => void;
	classname?: string;
	text?: string;
	children?: ReactNode;
}) {
	return (
		<button
			className={cn(
				"w-full font-medium py-2 rounded-lg text-nowrap cursor-pointer",
				classname
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
