import { Link } from "react-router-dom";
import Feed from "../components/Feed";
import LogoutButton from "../components/LogoutButton";

export default function Main() {
	return (
		<>
			<LogoutButton>Logout</LogoutButton>
			<Link to={`/login`}>Log in</Link> <br />
			<Link to={`/register`}>Sign up</Link> <br />
			<Link to={`/createPost`}>Create post </Link> <br />
			<Feed />
		</>
	);
}
