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
	options = ["Plan to Read", "Reading", "Currently Reading"],
	children,
	title,
	description,
}: RadioDialogProps) {
	const [open, setOpen] = useState(false);

	function onSelectOption(newOption: string) {
		if (value !== newOption) {
			onValueChange(newOption);
			toast(`The book has been added to '${newOption}'.`);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<RadioGroup value={value} onValueChange={onSelectOption}>
						{options.map((option) => (
							<div
								key={option}
								className="flex items-center space-x-2"
							>
								<RadioGroupItem
									value={option}
									id={option}
									onClick={() => setOpen(false)}
									className="cursor-pointer"
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
