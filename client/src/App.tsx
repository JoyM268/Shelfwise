import { Route, Routes, useLocation } from "react-router-dom";
import {
	useEffect,
	useState,
	useRef,
	type ChangeEvent,
	type FormEvent,
} from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Library from "./pages/Library";
import BookDetails from "./pages/BookDetails";
import { Toaster } from "./components/ui/sonner";
import { AnimatePresence } from "motion/react";
import Menu from "./components/Menu";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Signup from "./pages/Signup";

function App() {
	const isAuthenticated = true;
	const [search, setSearch] = useState("");
	const [results, setResults] = useState(false);
	const [menu, setMenu] = useState(false);
	const location = useLocation();
	const scrollPosition = useRef(0);
	const [query, setQuery] = useState<null | string>(null);

	useEffect(() => {
		setMenu(false);
	}, [location]);

	useEffect(() => {
		if (menu) {
			scrollPosition.current = window.scrollY;
			document.body.style.position = "fixed";
			document.body.style.top = `-${scrollPosition.current}px`;
			document.body.style.width = "100%";
		} else {
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
			window.scrollTo(0, scrollPosition.current);
			scrollPosition.current = 0;
		}

		return () => {
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
		};
	}, [menu]);

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth >= 640) {
				if (menu) {
					setMenu(false);
				}
			}
		}

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [menu]);

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

	return (
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
			<div className="pt-20 h-screen relative">
				<AnimatePresence>
					{menu && <Menu isAuthenticated={isAuthenticated} />}
				</AnimatePresence>
				<Routes>
					<Route
						path="/"
						element={
							<Home
								isAuthenticated={isAuthenticated}
								search={search}
								handleSearch={handleSearch}
								showResults={handleSubmit}
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
								query={query}
								handleSubmit={handleSubmit}
							/>
						}
					/>
					<Route
						element={
							<ProtectedRoutes
								isAuthenticated={isAuthenticated}
							/>
						}
					>
						<Route path="/library" element={<Library />} />
					</Route>
					<Route
						path="/book/:bookId"
						element={
							<BookDetails isAuthenticated={isAuthenticated} />
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
