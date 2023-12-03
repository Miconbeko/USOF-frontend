import { Link } from "react-router-dom";
import Feed from "../components/Feed";
import LogoutButton from "../components/LogoutButton";
import RequireAuthComponents from "../components/RequireAuthComponents";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/slices/authSlice";

export default function Main() {
	const auth = useSelector(selectAuth);

	return (
		<>
			<RequireAuthComponents unauthOnly>
				<Link to={`/login`}>Log in</Link> <br />
				<Link to={`/register`}>Sign up</Link> <br />
			</RequireAuthComponents>
			<RequireAuthComponents>
				<Link to={`/user/${auth?.user?.login}`}>Profile</Link>
				<Link to={`/createPost`}>Create post </Link> <br />
			</RequireAuthComponents>
			<Feed />
		</>
	);
}
