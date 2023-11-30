import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	selectUser,
	getError,
	getStatus,
	fetchUser,
} from "../store/slices/userSlice";
import { useEffect } from "react";

export default function UserPage() {
	const { login } = useParams();
	const dispatch = useDispatch();

	const user = useSelector(selectUser);
	const userStatus = useSelector(getStatus);
	const userError = useSelector(getError);

	useEffect(() => {
		if (userStatus === `idle`) {
			dispatch(fetchUser({ login }));
		}
	}, []);

	return (
		<>
			<p>{userError}</p>
			<h2>{user.login}</h2>
			<p>Full name: {user.fullName}</p>
			<p>Rating: {user.rating}</p>
			<p>Role: {user.role}</p>
		</>
	);
}
