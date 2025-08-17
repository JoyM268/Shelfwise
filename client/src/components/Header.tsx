import { NavLink } from "react-router-dom";

interface HeaderProps {
	isAuthenticated: boolean;
}

export default function Header({ isAuthenticated }: HeaderProps) {
	return (
		<div className="flex justify-between items-center whitespace-nowrap border-b border-solid border-b-gray-200 px-10 py-4 fixed w-screen z-30 top-0 bg-white select-none">
			<NavLink
				to="/"
				className="text-gray-900 text-2xl font-semibold leading-tight cursor-pointer flex items-center"
			>
				<img src="/logo.png" className="w-10 mr-1" />
				Shelfwise
			</NavLink>
			<nav className="flex gap-6 items-center text-gray-800 text-sm font-medium leading-normal">
				<NavLink to="/">Home</NavLink>
				{!isAuthenticated && (
					<>
						<NavLink to="/login">Login</NavLink>
						<NavLink to="/signup">Sign up</NavLink>
					</>
				)}

				{isAuthenticated && (
					<>
						<NavLink to="/library">My Library</NavLink>
						<NavLink to="/explore">Explore</NavLink>
						<button className="cursor-pointer bg-blue-500 text-white p-2 rounded-md">
							Logout
						</button>
					</>
				)}
			</nav>
		</div>
	);
}
