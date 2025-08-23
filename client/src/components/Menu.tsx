import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { useState } from "react";
import LogoutWarning from "./LogoutWarning";

export default function Menu({
	isAuthenticated,
	setMenu,
}: {
	isAuthenticated: boolean;
	setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [popup, setPopup] = useState(false);

	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{
					duration: 0.3,
					ease: "easeInOut",
				}}
				className="inset-0 fixed bg-black/20 z-40 sm:hidden"
			>
				<motion.nav
					initial={{ y: "-100%", opacity: 0.5 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: "-100%", opacity: 0.5 }}
					transition={{
						duration: 0.3,
						ease: "easeInOut",
					}}
					className="fixed flex flex-col z-40 bg-white w-full top-18 text-center text-sm font-semibold sm:hidden text-gray-700"
				>
					<NavLink
						to="/"
						className={({ isActive }) =>
							clsx(
								"p-2 pt-3 hover:scale-[1.04] transition-all duration-100",
								{
									"scale-[1.05] hover:scale-[1.05] cursor-default text-black":
										isActive,
								}
							)
						}
					>
						Home
					</NavLink>
					{isAuthenticated && (
						<NavLink
							to="/library"
							className={({ isActive }) =>
								clsx(
									"p-2 hover:scale-[1.04] transition-all duration-100",
									{
										"scale-[1.05] hover:scale-[1.05] cursor-default text-black":
											isActive,
									}
								)
							}
						>
							My Library
						</NavLink>
					)}
					<NavLink
						to="/explore"
						className={({ isActive }) =>
							clsx(
								"p-2 pb-3 hover:scale-[1.04] transition-all duration-100",
								{
									"scale-[1.05] hover:scale-[1.05] cursor-default text-black":
										isActive,
								}
							)
						}
					>
						Explore
					</NavLink>
					{!isAuthenticated && (
						<>
							<NavLink
								to="/login"
								className={({ isActive }) =>
									clsx(
										"p-2 pb-3 hover:scale-[1.04] transition-all duration-100",
										{
											"scale-[1.05] hover:scale-[1.05] cursor-default text-black":
												isActive,
										}
									)
								}
							>
								Login
							</NavLink>
							<NavLink
								to="/signup"
								className={({ isActive }) =>
									clsx(
										"list-none p-2 cursor-pointer bg-blue-500 text-white hover:bg-blue-600/90 transition-all duration-300",
										{
											"bg-blue-600 cursor-default":
												isActive,
										}
									)
								}
							>
								Sign up
							</NavLink>
						</>
					)}
					{isAuthenticated && (
						<li
							className="list-none p-2 cursor-pointer bg-blue-500 text-white hover:bg-blue-600/90 transition-all duration-300"
							onClick={() => {
								setPopup(true);
							}}
						>
							Logout
						</li>
					)}
				</motion.nav>
			</motion.div>
			<LogoutWarning
				open={popup}
				onOpenChange={setPopup}
				handleLogout={() => {
					console.log("Logged Out");
					setMenu(false);
				}}
			/>
		</>
	);
}
