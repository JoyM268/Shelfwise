import { useContext, createContext } from "react";
import type { AuthContextProps } from "@/types";

export const AuthContext = createContext<null | AuthContextProps>(null);

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("UseAuth must be used within an AuthProvider");
	}
	return context;
}
