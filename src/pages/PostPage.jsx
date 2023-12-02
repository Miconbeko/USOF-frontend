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
import UserMinify from "../components/UserMinify";

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
			<UserMinify user={post.author} />
			<br />
			<div>
				<h3>Answers:</h3>
				{post?.comments?.map((comment) => (
					<div key={comment.id}>
						<p>{comment.content}</p>
						<UserMinify user={comment.author} />
						<br />
					</div>
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
