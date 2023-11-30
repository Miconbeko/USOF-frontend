import { useEffect, useState } from "react";
import api from "../utils/api";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts } from "../store/slices/postsSlice";
import { nanoid } from "@reduxjs/toolkit";

export default function Feed() {
	// const posts = useSelector(selectAllPosts);
	// const dispatch = useDispatch();

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setLoading(true);
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
				if (loading) return <div>Loading</div>;
				if (posts && posts.length)
					return posts.map((post) => (
						<Post key={post.id} post={post} />
					));
				return <p>There is no posts :( </p>;
			})()}
		</>
	);
}
