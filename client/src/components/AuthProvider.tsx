import { AuthContext } from "@/context/useAuth";
import { useState } from "react";
import type { AuthTokens, DecodedUser } from "@/context/useAuth";
import { jwtDecode } from "jwt-decode";

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
	}

	return (
		<AuthContext.Provider value={{ user, login, logout, tokens }}>
			{children}
		</AuthContext.Provider>
	);
}
