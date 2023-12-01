import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchComments,
	fetchPost,
	fetchPostAndComments,
	getError,
	getStatus,
	selectPost,
} from "../store/slices/postSlice";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function PostPage() {
	const { id } = useParams();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);

	const post = useSelector(selectPost);
	const postStatus = useSelector(getStatus);
	const postError = useSelector(getError);

	useEffect(() => {
		dispatch(fetchPostAndComments({ id }, dispatch));
		setLoading(false);
	}, []);

	const loadedPostPage = (
		<>
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

	return (
		<>
			{(() => {
				if (loading) return <Loading />;
				if (!postError) return loadedPostPage;
				return <p>{postError}</p>;
			})()}
		</>
	);
}
