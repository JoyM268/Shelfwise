import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog";

interface BookRemoveWarningProps {
	id: string;
	handleBookRemove(id: string): void;
	alert: boolean;
	setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BookRemoveWarning({
	handleBookRemove,
	id,
	alert,
	setAlert,
}: BookRemoveWarningProps) {
	return (
		<AlertDialog open={alert} onOpenChange={setAlert}>
			<AlertDialogTrigger></AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to remove this book?
					</AlertDialogTitle>
					<AlertDialogDescription style={{ color: "black" }}>
						This action cannot be undone and all tracking data of
						this book will be permanently deleted.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="cursor-pointer">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						className="cursor-pointer"
						onClick={() => {
							if (handleBookRemove) handleBookRemove(id);
						}}
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
