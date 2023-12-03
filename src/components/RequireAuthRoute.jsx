import { useSelector } from "react-redux";
import { getError, getStatus, selectAuth } from "../store/slices/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import LoginForm from "./LoginForm";
import roles from "../utils/rolesPriority";

export default function RequireAuthRoute({ allowedRoles }) {
	const auth = useSelector(selectAuth);
	const authStatus = useSelector(getStatus);
	const authError = useSelector(getError);

	const location = useLocation();

	return (
		<>
			{(() => {
				if (authStatus === `idle`)
					return (
						<Navigate
							to="/login"
							state={{ from: location }}
							replace
						/>
					);

				if (
					!allowedRoles ||
					allowedRoles.find(
						(role) => roles[role] <= roles[auth.user.role],
					)
				)
					return <Outlet />;

				return (
					<Navigate to="/unauth" state={{ from: location }} replace />
				);
			})()}
		</>
	);
}
