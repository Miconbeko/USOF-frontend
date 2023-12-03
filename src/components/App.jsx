import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Main from "../pages/Main";
import Layout from "./Layout";
import Missing from "../pages/Missing";
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
					<Route path="/createPost" element={<CreatePostForm />} />
					<Route path="/post/:id" element={<PostPage />} />
					<Route path="/user/:login" element={<UserPage />} />
					<Route path="/unknownUser" element={<Missing />} />
					//TODO: make another page for unknown user
					<Route path="*" element={<Missing />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
