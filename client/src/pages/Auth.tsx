import {
	Form,
	FormItem,
	FormLabel,
	FormField,
	FormControl,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

interface AuthProps {
	title?: string;
	description?: string;
	name?: boolean;
	confirmPassword?: boolean;
	buttonText?: string;
	signup?: boolean;
}

export default function Auth({
	title = "Start Your Reading Journey",
	description = "Create an account to build your personal library, track your reading progress, and discover your next favorite book.",
	name = true,
	confirmPassword = true,
	buttonText = "Create Account",
	signup = true,
}: AuthProps) {
	const formSchema = z
		.object({
			...(name && {
				name: z.string().min(2, {
					message: "Name must be at least 2 characters.",
				}),
			}),
			email: z.email({
				message: "Invalid email address.",
			}),
			password: z.string().min(8, {
				message: "Password must be at least 8 characters.",
			}),
			...(confirmPassword && {
				confirmPassword: z.string().min(8, {
					message: "Password must be at least 8 characters.",
				}),
			}),
		})
		.refine(
			(data) => {
				if (!confirmPassword) return true;
				return data.password === data.confirmPassword;
			},
			{
				message: "Passwords don't match",
				path: ["confirmPassword"],
			}
		);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});
	return (
		<div className="max-w-[400px] mx-auto flex flex-col gap-5 px-6 pt-6 pb-5">
			<div className="flex flex-col gap-2">
				<h1 className="text-xl sm:text-3xl font-semibold">{title}</h1>
				<p className="text-xs sm:text-sm text-gray-500">
					{description}
				</p>
			</div>
			<Form {...form}>
				<form>
					{name && (
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs sm:text-sm">
										Name
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Your Name"
											{...field}
											className="text-sm sm:text-base"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xs sm:text-sm">
									Email Address
								</FormLabel>
								<FormControl>
									<Input
										placeholder="you@example.com"
										{...field}
										className="text-sm sm:text-base"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xs sm:text-sm">
									Password
								</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Password"
										{...field}
										className="text-sm sm:text-base"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{confirmPassword && (
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs sm:text-sm">
										Confirm Password
									</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Password"
											{...field}
											className="text-sm sm:text-base"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					<div>
						<Button
							type="submit"
							classname="bg-blue-500 text-white hover:bg-blue-500/90 text-sm sm:text-base mb-2"
						>
							{buttonText}
						</Button>
						<FormDescription className="pl-2">
							<div>
								{signup
									? "Already have an account?"
									: "Don't have an account?"}{" "}
								<NavLink
									to={signup ? "/login" : "/signup"}
									className="text-blue-400"
								>
									{signup ? "Login" : "Signup"}
								</NavLink>
							</div>
						</FormDescription>
					</div>
				</form>

				<div className="relative mt-0.5 mb-0.5">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-[10px] sm:text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>
			</Form>
			<div className="relative">
				<div className="absolute"></div>
				<button
					className="text-sm sm:text-base relative flex h-9 w-full items-center justify-center space-x-3 rounded-md bg-blue-500 px-4 font-medium hover:bg-blue-500/90 cursor-pointer"
					type="submit"
				>
					<img src="/github-logo.svg" className="h-5 w-5" />
					<span className=" text-white">GitHub</span>
				</button>
			</div>
		</div>
	);
}
