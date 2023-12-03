import { useDispatch, useSelector } from "react-redux";
import {
	getError,
	getStatus,
	logout,
	selectAuth,
} from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ children }) {
	const auth = useSelector(selectAuth);
	const authStatus = useSelector(getStatus);
	const authError = useSelector(getError);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate(`/`);
	};

	return (
		<button onClick={handleLogout} disabled={authStatus !== `succeeded`}>
			{children}
		</button>
	);
}
