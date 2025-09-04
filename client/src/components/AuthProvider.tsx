import { AuthContext } from "@/hooks/useAuth";
import { useState } from "react";
import type { AuthTokens, DecodedUser } from "@/types";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [tokens, setTokens] = useState<AuthTokens | null>(() => {
		const storedToken = localStorage.getItem("authTokens");
		if (storedToken) {
			try {
				const parsedTokens = JSON.parse(storedToken);
				return parsedTokens;
			} catch {
				localStorage.removeItem("authTokens");
				return null;
			}
		}
		return null;
	});

	const [user, setUser] = useState<DecodedUser | null>(() => {
		if (tokens?.access) {
			try {
				return jwtDecode(tokens.access);
			} catch {
				return null;
			}
		}
		return null;
	});

	function login(token: AuthTokens) {
		setTokens(token);
		setUser(jwtDecode(token.access));
		localStorage.setItem("authTokens", JSON.stringify(token));
	}

	function logout() {
		setTokens(null);
		setUser(null);
		localStorage.removeItem("authTokens");
		toast.success("Logout successful. See you next time!");
	}

	return (
		<AuthContext.Provider value={{ user, login, logout, tokens }}>
			{children}
		</AuthContext.Provider>
	);
}
