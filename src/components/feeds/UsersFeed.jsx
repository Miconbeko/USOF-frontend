import { useEffect, useState } from "react";
import api from "../../utils/api";
import Loading from "../Loading";
import Post from "../Post";
import UserMinify from "../UserMinify";
import UsersSearchForm from "../forms/search/UsersSearchForm";
import { nanoid } from "@reduxjs/toolkit";
import {
	createFilterQuery,
	createPageQuery,
	createSortQuery,
} from "../../utils/createQueries";

export default function UsersFeed() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errMsg, setErrMsg] = useState(``);
	const [refresh, setRefresh] = useState(null);

	const [search, setSearch] = useState(``);
	const [checkboxes, setCheckboxes] = useState([]);
	const [sort, setSort] = useState(`Newest`);
	const [page, setPage] = useState(1);

	const [paginationData, setPaginationData] = useState({});

	const handleSearch = async (values) => {
		setSearch(values.search);
		setCheckboxes(values.checkboxes);
		setSort(values.sort);
		setPage(values.page);
		setRefresh(nanoid());
	};

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await api.get(api.routes.allUsers, {
					params: {
						filter: createFilterQuery({ search, checkboxes }),
						sort: createSortQuery({ sort }),
						page: createPageQuery({ page }),
					},
				});

				setPaginationData(res.data.pagination);
				setUsers(res.data.users);
			} catch (err) {
				api.catcher(err, setErrMsg);
			}
			setLoading(false);
		};

		fetchUsers();
	}, [refresh]);

	return (
		<>
			Users: <br />
			<UsersSearchForm
				paginationData={paginationData}
				onSubmit={handleSearch}
			/>
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
