import { Link } from "react-router-dom";

export default function UserMinify({ user }) {
	const notFoundUserPlate = (
		<>
			<Link to={`/unknownUser`}>[Deleted]</Link>
			{/*<p>Rating: </p>*/}
		</>
	);

	const userPlate = (
		<>
			<Link to={`/user/${user?.login}`}>{user?.login}</Link>
			<p>Rating: {user?.rating}</p>
		</>
	);

	return <>{user ? userPlate : notFoundUserPlate}</>;
}
