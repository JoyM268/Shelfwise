import { useState, type ReactNode } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import clsx from "clsx";
import library from "@/api/library";
import { useParams } from "react-router-dom";
import type { BookStatus } from "@/pages/Library";

interface RadioDialogProps {
	children: ReactNode;
	value: string;
	onValueChange: (value: string) => void;
	options?: string[];
	title: string;
	description: string;
}

export function RadioDialog({
	value,
	onValueChange,
	options = ["Plan to Read", "Reading", "Finished"],
	children,
	title,
	description,
}: RadioDialogProps) {
	const [open, setOpen] = useState(false);
	const { bookId } = useParams();

	async function onSelectOption(newOption: string) {
		try {
			if (bookId) {
				if (!value) {
					await library.addBook(bookId, newOption as BookStatus);
				} else {
					await library.changeStatus(bookId, newOption as BookStatus);
				}

				if (value !== newOption) {
					onValueChange(newOption);
					toast(`The book has been added to '${newOption}'.`);
				}
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription className="text-gray-600">
						{description}
					</DialogDescription>
				</DialogHeader>
				<div className="mt-1 mb-2">
					<RadioGroup value={value} onValueChange={onSelectOption}>
						{options.map((option, index) => (
							<div
								key={option}
								className={clsx(
									"flex items-center space-x-2 mt-1",
									{
										"mt-2": index !== 0,
									}
								)}
							>
								<RadioGroupItem
									value={option}
									id={option}
									onClick={() => setOpen(false)}
									className="cursor-pointer border-black"
								/>
								<Label
									htmlFor={option}
									className="cursor-pointer flex-1"
								>
									{option}
								</Label>
							</div>
						))}
					</RadioGroup>
				</div>
			</DialogContent>
		</Dialog>
	);
}
