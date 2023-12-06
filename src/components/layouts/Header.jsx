import { Link } from "react-router-dom";
import RequireAuthComponents from "../wrappers/RequireAuthComponents";
import { useSelector } from "react-redux";
import { selectAuth } from "../../store/slices/authSlice";

export default function Header() {
	const auth = useSelector(selectAuth);
	return (
		<header className="fixed w-full bg-white border-b-2 border-teal-600">
			<div className={"flex m-auto max-w-4xl p-4 justify-between "}>
				<div>
					<Link to="/">
						<span className={""}>No newline at end</span>
					</Link>
				</div>
				<RequireAuthComponents unauthOnly>
					<Link to={`/login`} className={"text-white"}>
						Log in
					</Link>{" "}
					<Link to={`/register`} className={"text-white"}>
						Sign up
					</Link>{" "}
				</RequireAuthComponents>
				<RequireAuthComponents>
					<Link
						to={`/user/${auth?.user?.login}`}
						className={"text-white"}
					>
						Profile
					</Link>{" "}
					<Link to={`/createPost`}>Create post </Link>
				</RequireAuthComponents>
				<Link to={`/users`}>All users</Link>
				<Link to={`/categories`}>All categories</Link>
			</div>
		</header>
	);
}
