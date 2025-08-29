import { useAuth } from "@/context/useAuth";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
