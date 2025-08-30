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
import auth from "@/api/auth";
import { useAuth } from "@/context/useAuth";
import { useState } from "react";
import clsx from "clsx";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const formSchema = z.object({
		username: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		password: z.string().min(8, {
			message: "Password must be at least 8 characters.",
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setLoading(true);
		try {
			const data = await auth.loginUser(values.username, values.password);
			login(data);
			toast("Successfully logged in.");
			navigate("/");
		} catch (err) {
			let message = "An unexpected error occurred, try again later.";

			if (err instanceof AxiosError && err.response?.data?.detail) {
				message = "Invalid username or password.";
			}

			form.setError("root", {
				type: "manual",
				message: message,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-[400px] mx-auto flex flex-col gap-5 px-6 pt-10 pb-5">
			<div className="flex flex-col gap-2">
				<h1 className="text-xl sm:text-3xl font-semibold">
					Welcome Back
				</h1>
				<p className="text-xs sm:text-sm text-gray-500">
					Login to access your personal library and track your
					reading.
				</p>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
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
							{!loading ? "Login" : "Loading..."}
						</Button>
						<FormDescription className="pl-2">
							<div>
								Don't have an account?{" "}
								<NavLink to="/signup" className="text-blue-400">
									Signup
								</NavLink>
							</div>
						</FormDescription>
					</div>
				</form>
			</Form>
		</div>
	);
}
