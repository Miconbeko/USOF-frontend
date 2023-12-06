import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./forms/RegisterForm";
import LoginForm from "./forms/LoginForm";
import MainPage from "../pages/MainPage";
import Layout from "./layouts/Layout";
import UnknownRoutePage from "../pages/UnknownRoutePage";
import PostForm from "./forms/PostForm";
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
import RequireAuthRoutes from "./wrappers/RequireAuthRoutes";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import UsersFeed from "./feeds/UsersFeed";
import CategoriesFeed from "./feeds/CategoriesFeed";

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
					<Route path="/" element={<MainPage />} />
					<Route path="/users" element={<UsersFeed />} />
					<Route path="/categories" element={<CategoriesFeed />} />
					<Route path="/login" element={<LoginForm />} />
					<Route path="/register" element={<RegisterForm />} />
					{/*<Route element={<RequireAuthRoutes />}>*/}
					<Route path="/createPost" element={<PostForm />} />
					{/*</Route>*/}
					<Route path="/post/:id" element={<PostPage />} />
					<Route path="/user/:login" element={<UserPage />} />
					<Route path="/unknownUser" element={<UnknownRoutePage />} />
					//TODO: make another page for unknown user
					<Route path="/unauth" element={<UnauthorizedPage />} />
					<Route path="*" element={<UnknownRoutePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
