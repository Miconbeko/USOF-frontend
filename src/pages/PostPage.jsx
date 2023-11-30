import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchPost,
	getError,
	getStatus,
	selectPost,
} from "../store/slices/postSlice";
import { useEffect } from "react";

export default function PostPage() {
	const { id } = useParams();
	const dispatch = useDispatch();

	const post = useSelector(selectPost);
	const postStatus = useSelector(getStatus);
	const postError = useSelector(getError);

	useEffect(() => {
		if (post.id != id || postStatus === `idle`) {
			dispatch(fetchPost({ id }));
		}
	}, []);

	return (
		<>
			<p>{postError}</p>
			<h2>{post.title}</h2>
			<p>{post.content}</p> <br />
			<div>
				<Link>{post.author.login}</Link>
				<p>Rating: {post.author.rating}</p>
			</div>
		</>
	);
}
