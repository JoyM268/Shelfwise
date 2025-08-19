import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextTruncateProps {
	children: ReactNode;
	maxLines: number;
	className?: string;
	showMoreText?: string;
	showLessText?: string;
}

export function TextTruncate({
	children,
	maxLines,
	className,
	showMoreText = "Show more",
	showLessText = "Show less",
}: TextTruncateProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [shouldTruncate, setShouldTruncate] = useState(false);
	const [lineHeight, setLineHeight] = useState(0);
	const textRef = useRef<HTMLDivElement>(null);
	const measureRef = useRef<HTMLDivElement>(null);

	const isStringContent = typeof children === "string";

	useEffect(() => {
		const measureElement = measureRef.current;
		const textElement = textRef.current;

		if (!measureElement || !textElement) return;

		const computedStyle = window.getComputedStyle(measureElement);
		const computedLineHeight = Number.parseFloat(computedStyle.lineHeight);
		setLineHeight(computedLineHeight);

		const maxHeight = computedLineHeight * maxLines;
		const actualHeight = measureElement.scrollHeight;

		setShouldTruncate(actualHeight > maxHeight);
	}, [children, maxLines]);

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};

	const maxHeight = lineHeight * maxLines;

	return (
		<div className={cn("relative", className)}>
			<div
				ref={measureRef}
				className="absolute -top-[9999px] left-0 w-full opacity-0 pointer-events-none"
				style={{ visibility: "hidden" }}
			>
				{isStringContent ? (
					<div
						dangerouslySetInnerHTML={{ __html: children as string }}
					/>
				) : (
					<div>{children}</div>
				)}
			</div>

			<div
				ref={textRef}
				className={cn(
					"transition-all duration-300 ease-in-out overflow-hidden mb-1",
					!isExpanded && shouldTruncate && "relative"
				)}
				style={{
					maxHeight:
						!isExpanded && shouldTruncate
							? `${maxHeight}px`
							: "none",
				}}
			>
				{isStringContent ? (
					<div
						dangerouslySetInnerHTML={{ __html: children as string }}
					/>
				) : (
					<div>{children}</div>
				)}

				{!isExpanded && shouldTruncate && (
					<div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent pointer-events-none" />
				)}
			</div>

			{shouldTruncate && (
				<span
					onClick={toggleExpanded}
					className="text-sm font-medium text-blue-500 cursor-pointer"
				>
					{isExpanded ? showLessText : showMoreText}
				</span>
			)}
		</div>
	);
}
