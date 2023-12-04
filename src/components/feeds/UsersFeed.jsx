import { useEffect, useState } from "react";
import api from "../../utils/api";
import Loading from "../Loading";
import Post from "../Post";
import UserMinify from "../UserMinify";

export default function UsersFeed() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errMsg, setErrMsg] = useState(``);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await api.get(api.routes.allUsers);

				setUsers(res.data.users);
			} catch (err) {
				api.catcher(err, setErrMsg);
			}
			setLoading(false);
		};

		fetchUsers();
	}, []);

	return (
		<>
			Users: <br />
			{(() => {
				if (loading) return <Loading />;
				if (errMsg) return <p>{errMsg}</p>;
				if (users && users.length)
					return users.map((user) => (
						<div key={user.id}>
							<UserMinify user={user} />
							<br />
						</div>
					));
				return <p>There is no users :( </p>;
			})()}
		</>
	);
}
