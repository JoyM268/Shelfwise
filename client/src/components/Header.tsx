import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import clsx from "clsx";

interface HeaderProps {
	isAuthenticated: boolean;
	menu: boolean;
	setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({
	isAuthenticated,
	menu,
	setMenu,
}: HeaderProps) {
	return (
		<div className="flex justify-between items-center whitespace-nowrap border-b border-solid border-b-gray-200 pl-6 pr-6 py-4 fixed w-screen z-30 top-0 bg-white select-none">
			<NavLink
				to="/"
				className="text-gray-900 text-2xl font-semibold leading-tight cursor-pointer flex items-center"
			>
				<img src="/logo.png" className="w-10 mr-1" />
				Shelfwise
			</NavLink>
			<nav className="gap-6 items-center text-gray-800 text-sm font-medium leading-normal hidden sm:flex pr-3">
				<NavLink
					to="/"
					className={({ isActive }) =>
						clsx({
							"text-black scale-[1.02] cursor-default": isActive,
						})
					}
				>
					Home
				</NavLink>
				{!isAuthenticated && (
					<>
						<NavLink
							to="/login"
							className={({ isActive }) =>
								clsx({
									"text-black scale-[1.02] cursor-default":
										isActive,
								})
							}
						>
							Login
						</NavLink>
						<NavLink
							to="/signup"
							className={({ isActive }) =>
								clsx({
									"text-black scale-[1.02] cursor-default":
										isActive,
								})
							}
						>
							Sign up
						</NavLink>
					</>
				)}

				{isAuthenticated && (
					<>
						<NavLink
							to="/library"
							className={({ isActive }) =>
								clsx({
									"text-black scale-[1.02] cursor-default":
										isActive,
								})
							}
						>
							My Library
						</NavLink>
						<NavLink
							to="/explore"
							className={({ isActive }) =>
								clsx({
									"text-black scale-[1.02] cursor-default":
										isActive,
								})
							}
						>
							Explore
						</NavLink>
						<button className="cursor-pointer bg-blue-500 text-white p-2 rounded-md hover:scale-[0.97] shadow">
							Logout
						</button>
					</>
				)}
			</nav>
			<div
				onClick={() => setMenu((menu) => !menu)}
				className="cursor-pointer p-2 hover:bg-gray-300/30 rounded-full transition-all duration-300 sm:hidden"
			>
				{menu ? <CloseIcon /> : <MenuIcon />}
			</div>
		</div>
	);
}
