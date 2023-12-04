import { useSelector } from "react-redux";
import { getError, getStatus, selectUser } from "../store/slices/userSlice";
import { selectAuth } from "../store/slices/authSlice";
import roles from "../utils/rolesPriority";

export default function RequireOwnerComponents({
	children,
	userId,
	allowedRoles,
}) {
	const auth = useSelector(selectAuth);
	const authStatus = useSelector(getStatus);
	const authError = useSelector(getError);

	return (
		<>
			{auth?.user?.id === userId ||
			allowedRoles?.find((role) => roles[role] <= roles[auth.user.role])
				? children
				: null}
		</>
	);
}
