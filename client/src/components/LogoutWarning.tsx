import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from "./ui/alert-dialog";
import type { LogoutWarningProps } from "@/types";

export default function LogoutWarning({
	open,
	onOpenChange,
	handleLogout,
}: LogoutWarningProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to log out?
					</AlertDialogTitle>
					<AlertDialogDescription style={{ color: "black" }}>
						This will end your current session. You will need to
						enter your credentials to log in again.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleLogout}
						className="cursor-pointer bg-blue-500 hover:bg-blue-500/90"
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
