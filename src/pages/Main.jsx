import { Link } from "react-router-dom";
import Feed from "../components/Feed";
import LogoutButton from "../components/LogoutButton";
import RequireAuthComponent from "../components/RequireAuthComponent";

export default function Main() {
	return (
		<>
			<RequireAuthComponent unauthOnly>
				<Link to={`/login`}>Log in</Link> <br />
				<Link to={`/register`}>Sign up</Link> <br />
			</RequireAuthComponent>
			<RequireAuthComponent>
				<LogoutButton>Logout</LogoutButton> <br />
				<Link to={`/createPost`}>Create post </Link> <br />
			</RequireAuthComponent>
			<Feed />
		</>
	);
}
