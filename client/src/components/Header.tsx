import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import clsx from "clsx";
import MenuDropdown from "./MenuDropdown";
import ProfilePhoto from "./ProfilePhoto";
import { useAuth } from "@/context/useAuth";

interface HeaderProps {
	menu: boolean;
	setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ menu, setMenu }: HeaderProps) {
	const { user } = useAuth();

	return (
		<div className="flex justify-between items-center whitespace-nowrap border-b border-solid border-b-gray-200 px-4 sm:pl-6 sm:pr-6 py-4 fixed w-screen z-50 top-0 bg-white select-none">
			<NavLink
				to="/"
				className="text-gray-900 text-2xl font-semibold leading-tight cursor-pointer flex items-center"
			>
				<img src="/logo.png" className="w-10 mr-1" />
				Shelfwise
			</NavLink>
			<nav className="gap-6 items-center text-gray-600 text-sm font-medium leading-normal hidden sm:flex pr-3">
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

				{user && (
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
				)}

				<NavLink
					to="/explore"
					className={({ isActive }) =>
						clsx({
							"text-black scale-[1.02] cursor-default": isActive,
						})
					}
				>
					Explore
				</NavLink>

				{!user && (
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
								clsx(
									"cursor-pointer bg-blue-500 text-white p-2 rounded-md hover:scale-[0.97] shadow",
									{
										"bg-blue-600 cursor-default": isActive,
									}
								)
							}
						>
							Sign up
						</NavLink>
					</>
				)}

				{user && (
					<MenuDropdown>
						<ProfilePhoto name={user.name || user.username} />
					</MenuDropdown>
				)}
			</nav>
			<div
				onClick={() => setMenu((menu) => !menu)}
				className="cursor-pointer sm:hidden"
			>
				{menu ? (
					<div className="p-2 hover:bg-gray-300/30 rounded-full transition-all duration-300">
						<CloseIcon />
					</div>
				) : !user ? (
					<div className="p-2 hover:bg-gray-300/30 rounded-full transition-all duration-300">
						<MenuIcon />
					</div>
				) : (
					<div className="mr-2">
						<ProfilePhoto name={user.name || user.username} />
					</div>
				)}
			</div>
		</div>
	);
}
