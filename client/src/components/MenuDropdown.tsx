import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "./ui/dropdown-menu";
import LogoutWarning from "./LogoutWarning";
import { useState, type ReactNode } from "react";
import { useAuth } from "@/context/useAuth";

export default function MenuDropdown({ children }: { children: ReactNode }) {
	const { logout } = useAuth();

	const [popup, setPopup] = useState(false);
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className="outline-none">
					{children}
				</DropdownMenuTrigger>
				<DropdownMenuContent className="mr-7 mt-1">
					<DropdownMenuItem
						className="cursor-pointer"
						onClick={() => setPopup(true)}
					>
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<LogoutWarning
				open={popup}
				onOpenChange={setPopup}
				handleLogout={logout}
			/>
		</>
	);
}
