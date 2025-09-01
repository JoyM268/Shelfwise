import { useState, useEffect } from "react";

export default function useProgress(bookProgress: number | undefined | null) {
	const [progress, setProgress] = useState(0);
	const [progressValue, setProgressValue] = useState(0);

	useEffect(() => {
		if (bookProgress !== undefined && bookProgress !== null) {
			setProgress(bookProgress);
			setProgressValue(bookProgress);
		}
	}, [bookProgress]);

	return {
		progress,
		setProgress,
		inputValue: progressValue,
		setInputValue: setProgressValue,
	};
}
