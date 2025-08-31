import { type ChangeEvent, type FormEvent, useState } from "react";

export default function useSearch() {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState(false);
	const [query, setQuery] = useState<null | string>(null);

	function handleSearch(event?: ChangeEvent<HTMLInputElement>) {
		if (event) {
			const value = event.target.value;
			if (value) setSearch(value);
			else {
				setSearch("");
				setResults(false);
			}
		} else {
			setResults(false);
			setSearch("");
		}
	}

	function handleSubmit(event?: FormEvent<HTMLFormElement>) {
		if (event) {
			event.preventDefault();
		}

		if (search) {
			setQuery(search.trim());
			setResults(true);
		}
	}

	return { results, query, search, handleSearch, handleSubmit };
}
