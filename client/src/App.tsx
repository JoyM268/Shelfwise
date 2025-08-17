import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Explore from "./pages/Explore";

function App() {
	const isAuthenticated = true;
	const [search, setSearch] = useState("");

	function handleSearch(event?: ChangeEvent<HTMLInputElement>) {
		if (event) setSearch(event.target.value);
		else setSearch("");
	}

	return (
		<BrowserRouter>
			<div className="relative bg-white">
				<Header isAuthenticated={isAuthenticated} />
				<Routes>
					<Route
						path="/"
						element={
							<Home
								isAuthenticated={isAuthenticated}
								search={search}
								handleSearch={handleSearch}
							/>
						}
					/>
					<Route
						path="/explore"
						element={
							<Explore
								search={search}
								handleSearch={handleSearch}
							/>
						}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
