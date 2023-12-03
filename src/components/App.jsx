import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Main from "../pages/Main";
import Layout from "./Layout";
import UnknownRoute from "../pages/UnknownRoute";
import CreatePostForm from "./CreatePostForm";
import PostPage from "../pages/PostPage";
import UserPage from "../pages/UserPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchAuthLocal,
	getError,
	getStatus,
	getUserCheckToken,
	selectAuth,
} from "../store/slices/authSlice";
import RequireAuthRoute from "./RequireAuthRoute";
import UnauthorizedPage from "../pages/UnauthorizedPage";

export default function App() {
	const auth = useSelector(selectAuth);
	const authStatus = useSelector(getStatus);
	const authError = useSelector(getError);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAuthLocal())
			.unwrap()
			.then(() => {
				dispatch(getUserCheckToken());
			})
			.catch(() => {});
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<LoginForm />} />
					<Route path="/register" element={<RegisterForm />} />
					<Route element={<RequireAuthRoute />}>
						<Route
							path="/createPost"
							element={<CreatePostForm />}
						/>
					</Route>
					<Route path="/post/:id" element={<PostPage />} />
					<Route path="/user/:login" element={<UserPage />} />
					<Route path="/unknownUser" element={<UnknownRoute />} />
					//TODO: make another page for unknown user
					<Route path="/unauth" element={<UnauthorizedPage />} />
					<Route path="*" element={<UnknownRoute />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
