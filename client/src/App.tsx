import { Route, Routes } from "react-router-dom";
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
import AuthProvider from "./components/AuthProvider";
import useMenu from "./hooks/useMenu";
import useSearch from "./hooks/useSearch";

function App() {
	const { menu, setMenu } = useMenu();
	const { results, query, search, handleSearch, handleSubmit } = useSearch();

	return (
		<AuthProvider>
			<div className="relative bg-white">
				<Header menu={menu} setMenu={setMenu} />
				<Toaster
					position="top-center"
					toastOptions={{
						duration: 3000,
					}}
				/>
				<div className="pt-20 h-screen relative">
					<AnimatePresence>{menu && <Menu />}</AnimatePresence>
					<Routes>
						<Route
							path="/"
							element={
								<Home
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
						<Route element={<ProtectedRoutes />}>
							<Route path="/library" element={<Library />} />
						</Route>
						<Route path="/book/:bookId" element={<BookDetails />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</div>
			</div>
		</AuthProvider>
	);
}

export default App;
