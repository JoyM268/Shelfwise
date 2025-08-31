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
		return storedToken ? JSON.parse(storedToken) : null;
	});

	const [user, setUser] = useState<DecodedUser | null>(() => {
		if (tokens?.access) {
			return jwtDecode(tokens.access);
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
		toast("Logout successful. See you next time!");
	}

	return (
		<AuthContext.Provider value={{ user, login, logout, tokens }}>
			{children}
		</AuthContext.Provider>
	);
}
