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
			<p>
				<Link to={`/user/${user?.login}`}>{user?.login}</Link> Rating:
				{user?.rating}
			</p>
		</>
	);

	return <>{user ? userPlate : notFoundUserPlate}</>;
}
