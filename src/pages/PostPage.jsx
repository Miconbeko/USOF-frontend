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
import CommentForm from "../components/CommentForm";
import { nanoid } from "@reduxjs/toolkit";

export default function PostPage() {
	const post = useSelector(selectPost);
	const postStatus = useSelector(getStatus);
	const postError = useSelector(getError);
	const dispatch = useDispatch();

	const { id } = useParams();
	const [commented, setCommented] = useState(null);

	const refresh = () => {
		setCommented(nanoid());
	};

	useEffect(() => {
		dispatch(fetchPostAndComments({ id }, dispatch));
	}, [commented]);

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
			<CommentForm postId={post.id} onSubmit={refresh} />
		</>
	);

	return (
		<>
			{(() => {
				if (postStatus === `loading`) return <Loading />;
				if (postStatus === `succeeded`) return loadedPostPage;
				return <p>{postError}</p>;
			})()}
		</>
	);
}
