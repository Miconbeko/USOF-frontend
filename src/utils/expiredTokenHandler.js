import { logout } from "../store/slices/authSlice";
import { Navigate, useLocation } from "react-router-dom";

export default function expiredTokenHandler(err, navigate, location, dispatch) {
	if (err?.response?.data?.message === `Invalid or expired token`) {
		dispatch(logout());
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	return null;
}
