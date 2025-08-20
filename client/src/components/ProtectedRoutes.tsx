import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes({
	isAuthenticated,
}: {
	isAuthenticated: boolean;
}) {
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
