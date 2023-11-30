import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchComments,
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
		// if (postStatus === `idle`) {
		dispatch(fetchPost({ id }));
		dispatch(fetchComments({ id }));
		// }
	}, []);

	return (
		<>
			<p>{postError}</p>
			<h2>{post.title}</h2>
			<p>{post.content}</p> <br />
			<div>
				<Link to={`/user/${post.author.login}`}>
					{post.author.login}
				</Link>
				<p>Rating: {post.author.rating}</p>
			</div>
			<br />
			<div>
				<h3>Answers:</h3>
				{post?.comments?.map((comment) => (
					<p key={comment.id}>
						{comment.content}
						<Link to={`/user/${comment.author.login}`}>
							{" "}
							{comment.author.login}
						</Link>
					</p>
				))}
			</div>
		</>
	);
}
