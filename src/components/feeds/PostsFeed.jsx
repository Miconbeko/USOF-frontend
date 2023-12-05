import { useEffect, useState } from "react";
import api from "../../utils/api";
import Post from "../Post";
import Loading from "../Loading";
import { nanoid } from "@reduxjs/toolkit";
import { createFilterQuery, createSortQuery } from "../../utils/createQueries";
import PostsSearchForm from "../forms/search/PostsSearchForm";

export default function PostsFeed() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errMsg, setErrMsg] = useState(``);
	const [refresh, setRefresh] = useState(null);

	const [search, setSearch] = useState(``);
	const [checkboxes, setCheckboxes] = useState([]);
	const [sort, setSort] = useState(`Newest`);

	const handleSearch = async (values) => {
		setSearch(values.search);
		setCheckboxes(values.checkboxes);
		setSort(values.sort);
		setRefresh(nanoid());
	};

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await api.get(api.routes.allPosts, {
					params: {
						filter: createFilterQuery({ search, checkboxes }),
						sort: createSortQuery({ sort }),
					},
				});

				const posts = res.data.posts;
				const uniqueUsersId = [
					...new Set(
						posts.map((post) => post.userId).filter((id) => id),
					),
				];

				if (uniqueUsersId.length) {
					try {
						const res = await api.get(api.routes.usersByIds, {
							params: {
								ids: uniqueUsersId.join(`,`),
							},
						});
						const users = res.data.users;

						for (const post of posts) {
							post.author = users.find(
								(user) => post.userId === user.id,
							);
						}
					} catch (err) {
						api.catcher(err);
					}
				}

				setPosts(posts);
			} catch (err) {
				api.catcher(err, setErrMsg);
			}
			setLoading(false);
		};

		fetchPosts();
	}, [refresh]);

	return (
		<>
			Feed: <br />
			<PostsSearchForm onSubmit={handleSearch} />
			{(() => {
				if (loading) return <Loading />;
				if (errMsg) return <p>{errMsg}</p>;
				if (posts && posts.length)
					return (
						<>
							{posts.map((post) => (
								<div key={post.id}>
									<Post post={post} />
									<br />
									<br />
								</div>
							))}
						</>
					);
				return <p>There is no posts :( </p>;
			})()}
		</>
	);
}
