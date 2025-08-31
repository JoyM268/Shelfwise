import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/types";

export default function Button({
	onClick,
	classname = "text-gray-700 hover:bg-gray-300/90 bg-gray-300 ",
	children = "Button",
	type = "button",
	disabled = false,
}: ButtonProps) {
	return (
		<input
			type={type}
			disabled={disabled}
			className={cn(
				"w-full font-medium py-2 rounded-lg text-nowrap cursor-pointer",
				classname
			)}
			onClick={onClick}
			value={children}
		></input>
	);
}
