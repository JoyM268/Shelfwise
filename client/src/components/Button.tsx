import { cn } from "@/lib/utils";

export default function Button({
	onClick,
	classname = "text-gray-700 hover:bg-gray-300/90 bg-gray-300 ",
	children = "Button",
	type = "button",
	disabled = false,
}: {
	onClick?: () => void;
	classname?: string;
	text?: string;
	children?: string;
	type?: "button" | "submit";
	disabled?: boolean;
}) {
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
