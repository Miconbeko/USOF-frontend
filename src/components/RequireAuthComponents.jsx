import { useSelector } from "react-redux";
import { getError, getStatus, selectAuth } from "../store/slices/authSlice";
import roles from "../utils/rolesPriority";

export default function RequireAuthComponents({
	children,
	allowedRoles,
	unauthOnly = false,
}) {
	const auth = useSelector(selectAuth);
	const authStatus = useSelector(getStatus);
	const authError = useSelector(getError);

	return (
		<>
			{(() => {
				if (authStatus === `loading`) return;

				if (authStatus === `idle`) {
					if (!unauthOnly) return;
					return children;
				}
				if (unauthOnly) return;

				if (
					!allowedRoles ||
					allowedRoles.find(
						(role) => roles[role] <= roles[auth.user.role],
					)
				)
					return children;

				return;
			})()}
		</>
	);
}
