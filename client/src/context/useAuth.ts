import { useContext, createContext } from "react";

export interface DecodedUser {
	token_type: string;
	exp: number;
	iat: number;
	jti: string;
	user_id: number;
	username: string;
}

export interface AuthTokens {
	access: string;
	refresh: string;
}

export interface AuthContextProps {
	user: DecodedUser | null;
	tokens: AuthTokens | null;
	login: (tokens: AuthTokens) => void;
	logout: () => void;
}

export const AuthContext = createContext<null | AuthContextProps>(null);

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("UseAuth must be used within an AuthProvider");
	}
	return context;
}
