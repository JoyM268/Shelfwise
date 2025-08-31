import { useAuth } from "@/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
	const { user } = useAuth();

	return user ? <Outlet /> : <Navigate to="/login" replace />;
}
