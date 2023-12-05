import { Link } from "react-router-dom";
import PostsFeed from "../components/feeds/PostsFeed";
import LogoutButton from "../components/buttons/LogoutButton";
import RequireAuthComponents from "../components/wrappers/RequireAuthComponents";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/slices/authSlice";

export default function MainPage() {
	const auth = useSelector(selectAuth);

	return (
		<>
			<RequireAuthComponents unauthOnly>
				<Link to={`/login`}>Log in</Link> <br />
				<Link to={`/register`}>Sign up</Link> <br />
			</RequireAuthComponents>
			<RequireAuthComponents>
				<Link to={`/user/${auth?.user?.login}`}>Profile</Link> <br />
				<Link to={`/createPost`}>Create post </Link> <br />
			</RequireAuthComponents>
			<Link to={`/users`}>All users</Link> <br />
			<Link to={`/categories`}>All categories</Link> <br /> <br />
			<PostsFeed />
		</>
	);
}
