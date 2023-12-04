import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header className="flex justify-center fixed w-full bg-emerald-400/50">
			<Link to="/">Home</Link>
			Header
		</header>
	);
}
