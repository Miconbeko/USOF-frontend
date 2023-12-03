import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	selectUser,
	getError,
	getStatus,
	fetchUser,
} from "../store/slices/userSlice";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function UserPage() {
	const user = useSelector(selectUser);
	const userStatus = useSelector(getStatus);
	const userError = useSelector(getError);
	const dispatch = useDispatch();

	const { login } = useParams();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(fetchUser({ login }));
		setLoading(false);
	}, []);

	const loadedUserPage = (
		<>
			<img
				className="w-32 h-32 rounded"
				src={user.avatar}
				alt="User avatar"
			/>
			<h2>{user.login}</h2>
			<p>Full name: {user.fullName}</p>
			<p>Rating: {user.rating}</p>
			<p>Role: {user.role}</p>
		</>
	);

	return (
		<>
			{(() => {
				if (loading) return <Loading />;
				if (!userError) return loadedUserPage;
				return <p>User not found</p>;
			})()}
		</>
	);
}
