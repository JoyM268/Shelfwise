import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Shelf from "../public/shelf.png";

function App() {
	const isAuthenticated = true;
	return (
		<BrowserRouter>
			<div className="relative">
				<Header isAuthenticated={isAuthenticated} />
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
