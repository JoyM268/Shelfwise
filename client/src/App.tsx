import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Library from "./pages/Library";
import BookDetails from "./pages/BookDetails";
import { Toaster } from "./components/ui/sonner";

function App() {
	const isAuthenticated = true;
	const [search, setSearch] = useState("");
	const [results, setResults] = useState(false);
	const [menu, setMenu] = useState(false);

	function handleSearch(event?: ChangeEvent<HTMLInputElement>) {
		if (event) {
			const value = event.target.value;
			setSearch(value);
			if (!value) {
				setResults(false);
			}
		} else {
			setSearch("");
			setResults(false);
		}
	}

	function showResults() {
		setResults(true);
	}

	return (
		<BrowserRouter>
			<div className="relative bg-white">
				<Header
					isAuthenticated={isAuthenticated}
					menu={menu}
					setMenu={setMenu}
				/>
				<Toaster
					position="top-center"
					toastOptions={{
						duration: 1500,
					}}
				/>
				<div className="pt-20 h-screen">
					<Routes>
						<Route
							path="/"
							element={
								<Home
									isAuthenticated={isAuthenticated}
									search={search}
									handleSearch={handleSearch}
									showResults={showResults}
								/>
							}
						/>
						<Route
							path="/explore"
							element={
								<Explore
									search={search}
									handleSearch={handleSearch}
									results={results}
									showResults={showResults}
								/>
							}
						/>
						<Route path="/library" element={<Library />} />
						<Route path="/book/:id" element={<BookDetails />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
