import { useSelector } from "react-redux";
import { getError, getStatus, selectUser } from "../store/slices/userSlice";
import { selectAuth } from "../store/slices/authSlice";

export default function RequireOwnerComponents({ children, userId }) {
	const auth = useSelector(selectAuth);
	const authStatus = useSelector(getStatus);
	const authError = useSelector(getError);

	return <>{auth?.user?.id === userId ? children : null}</>;
}
