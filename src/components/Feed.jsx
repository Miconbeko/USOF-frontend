import { useEffect, useState } from "react";
import api from "../utils/api";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts } from "../store/slices/postsSlice";
import { nanoid } from "@reduxjs/toolkit";
import Loading from "./Loading";

export default function Feed() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await api.get(api.routes.allPosts);

				setPosts(res.data.posts);
			} catch (err) {
				api.catcher(err);
			}
			setLoading(false);
		};

		fetchPosts();
	}, []);

	return (
		<>
			Feed <br />
			{(() => {
				if (loading) return <Loading />;
				if (posts && posts.length)
					return posts.map((post) => (
						<Post key={post.id} post={post} />
					));
				return <p>There is no posts :( </p>;
			})()}
		</>
	);
}
