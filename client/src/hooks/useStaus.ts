import { useEffect, useState } from "react";

export default function useStatus(status: string | undefined | null) {
	const [bookStatus, setBookStatus] = useState<string>("");

	useEffect(() => {
		if (status !== undefined && status !== null) setBookStatus(status);
	}, [status]);

	return { status: bookStatus, setStatus: setBookStatus };
}
