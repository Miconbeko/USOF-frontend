import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	deletePost,
	fetchComments,
	fetchPost,
	fetchPostAndComments,
	getError,
	getStatus,
	lockPost,
	selectPost,
} from "../store/slices/postSlice";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import UserMinify from "../components/UserMinify";
import CommentForm from "../components/CommentForm";
import { nanoid } from "@reduxjs/toolkit";
import RequireOwnerComponents from "../components/RequireOwnerComponents";
import ConfirmButton from "../components/ConfirmButton";
import RequireAuthComponents from "../components/RequireAuthComponents";

export default function PostPage() {
	const post = useSelector(selectPost);
	const postStatus = useSelector(getStatus);
	const postError = useSelector(getError);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();
	const [commented, setCommented] = useState(null);

	const refresh = () => {
		setCommented(nanoid());
	};

	const handlePostDelete = async () => {
		try {
			await dispatch(deletePost({ id: post.id })).unwrap();

			navigate(`/`);
		} catch (err) {
			console.error(err);
		}
	};

	const handlePostLock = async () => {
		const timer = {
			days: 1,
		};

		try {
			await dispatch(lockPost({ id: post.id, timer }));
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		dispatch(fetchPostAndComments({ id }, dispatch));
	}, [commented]);

	const loadedPostPage = (
		<>
			<RequireOwnerComponents
				userId={post.userId}
				allowedRoles={[`admin`]}
			>
				<ConfirmButton actionHandler={handlePostDelete}>
					Delete post
				</ConfirmButton>
			</RequireOwnerComponents>
			<RequireAuthComponents allowedRoles={[`admin`]}>
				<ConfirmButton actionHandler={handlePostLock}>
					Lock 1d
				</ConfirmButton>
			</RequireAuthComponents>
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
