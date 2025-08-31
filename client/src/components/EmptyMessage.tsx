import { NavLink } from "react-router-dom";
import type { EmptyMessageProps } from "@/types";

export default function EmptyMessage({
	title,
	description,
	buttonText = "Explore Books to Add",
	link = "/explore",
}: EmptyMessageProps) {
	return (
		<div className="flex justify-center w-full mt-3 sm:mt-10 flex-col items-center gap-5">
			<div
				className="w-[300px] h-[200px] sm:w-[400px] sm:h-[300px] bg-cover bg-center rounded-lg"
				style={{
					backgroundImage: 'url("/empty.png")',
				}}
			/>
			<div className="text-center max-w-96">
				<span className="text-lg sm:text-xl font-semibold">
					{title}
				</span>
				<p className="tracking-tight text-gray-800 text-xs text-wrap sm:text-base">
					{description}
				</p>
			</div>
			<div>
				<NavLink
					to={link}
					className="bg-gray-200 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-gray-800 font-semibold hover:scale-[0.98] cursor-pointer transition-all duration-300 shadow text-xs sm:text-base"
				>
					{buttonText}
				</NavLink>
			</div>
		</div>
	);
}
