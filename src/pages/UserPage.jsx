import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	selectUser,
	getError,
	getStatus,
	fetchUser,
} from "../store/slices/userSlice";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import RequireOwnerComponents from "../components/wrappers/RequireOwnerComponents";
import LogoutButton from "../components/buttons/LogoutButton";
import { fullLogout, logout } from "../store/slices/authSlice";
import ToggleButton from "../components/buttons/ToggleButton";

export default function UserPage() {
	const user = useSelector(selectUser);
	const userStatus = useSelector(getStatus);
	const userError = useSelector(getError);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { login } = useParams();

	const handleLogout = () => {
		dispatch(logout());
		navigate(`/`);
	};

	const handleFullogout = () => {
		dispatch(fullLogout());
		navigate(`/`);
	};

	useEffect(() => {
		dispatch(fetchUser({ login }));
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
			<RequireOwnerComponents userId={user.id}>
				<button onClick={handleLogout}>Logout</button> <br />
				<ToggleButton actionHandler={handleFullogout}>
					Full logout
				</ToggleButton>
				<br />
			</RequireOwnerComponents>
		</>
	);

	return (
		<>
			{(() => {
				if (userStatus === `loading`) return <Loading />;
				if (userStatus === `succeeded`) return loadedUserPage;
				return <p>User not found</p>;
			})()}
		</>
	);
}
