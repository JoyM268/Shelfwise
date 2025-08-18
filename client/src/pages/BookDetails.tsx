import { useParams } from "react-router-dom";

export default function BookDetails() {
	const { bookId } = useParams();

	return <div>{bookId}</div>;
}
