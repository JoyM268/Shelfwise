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
import { NavLink, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import clsx from "clsx";
import auth from "@/api/auth";

export default function Signup() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const formSchema = z
		.object({
			name: z.string().min(1, {
				message: "Name must be at least 1 characters.",
			}),
			username: z.string().min(2, {
				message: "Username must be at least 2 characters.",
			}),
			password: z.string().min(8, {
				message: "Password must be at least 8 characters.",
			}),
			confirmPassword: z.string().min(8, {
				message: "Password must be at least 8 characters.",
			}),
		})
		.refine(
			(data) => {
				return data.password === data.confirmPassword;
			},
			{
				message: "Passwords don't match",
				path: ["confirmPassword"],
			}
		);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			username: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setLoading(true);
		try {
			const data = await auth.registerUser(
				values.name,
				values.username,
				values.password
			);

			navigate("/login");
		} catch {
			form.setError("root", {
				type: "manual",
				message: "An unexpected error occurred, try again later.",
			});
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="max-w-[400px] mx-auto flex flex-col gap-5 px-6 pt-8 pb-5">
			<div className="flex flex-col gap-2">
				<h1 className="text-xl sm:text-3xl font-semibold">
					Start Your Reading Journey
				</h1>
				<p className="text-xs sm:text-sm text-gray-500">
					Create an account to build your personal library, track your
					reading progress, and discover your next favorite book.
				</p>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xs sm:text-sm">
									Your Name
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Name"
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
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xs sm:text-sm">
									Username
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Username"
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

					{form.formState.errors.root && (
						<p className="text-sm text-red-600 text-center">
							{form.formState.errors.root.message}
						</p>
					)}

					<div>
						<Button
							disabled={loading}
							type="submit"
							classname={clsx(
								"bg-blue-500 text-white hover:bg-blue-500/90 text-sm sm:text-base mb-2",
								{
									"cursor-not-allowed bg-blue-500/60 hover:bg-blue-500/60":
										loading,
								}
							)}
						>
							{!loading ? "Create Account" : "Loading..."}
						</Button>
						<FormDescription className="pl-2">
							<div>
								Already have an account?{" "}
								<NavLink to="/login" className="text-blue-400">
									Login
								</NavLink>
							</div>
						</FormDescription>
					</div>
				</form>
			</Form>
		</div>
	);
}
