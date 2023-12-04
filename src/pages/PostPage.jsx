import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	deletePost,
	fetchComments,
	fetchPost,
	fetchPostAndComments,
	getError,
	getPostLock,
	getStatus,
	isPostLocked,
	lockPost,
	postLock,
	selectPost,
	unlockPost,
} from "../store/slices/postSlice";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import UserMinify from "../components/UserMinify";
import CommentForm from "../components/forms/CommentForm";
import { nanoid } from "@reduxjs/toolkit";
import RequireOwnerComponents from "../components/wrappers/RequireOwnerComponents";
import ConfirmButton from "../components/buttons/ConfirmButton";
import RequireAuthComponents from "../components/wrappers/RequireAuthComponents";
import PostForm from "../components/forms/PostForm";
import Comment from "../components/Comment";
import CommentsSection from "../components/feeds/CommentsSection";

export default function PostPage() {
	const post = useSelector(selectPost);
	const postLock = useSelector(getPostLock);
	const postStatus = useSelector(getStatus);
	const postError = useSelector(getError);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();
	const [commented, setCommented] = useState(null);
	const [showEditForm, setShowEditForm] = useState(false);

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

	const handlePostUnlock = async () => {
		try {
			await dispatch(unlockPost({ id: post.id }));
		} catch (err) {
			console.error(err);
		}
	};

	const handlePostEdit = async () => {
		setShowEditForm(!showEditForm);
	};

	const lockMessage = (
		<>
			<p>This post is locked by BY:</p>
			<UserMinify user={post?.lock?.author} /> <br /> <br />
		</>
	);

	useEffect(() => {
		dispatch(fetchPostAndComments({ id }, dispatch));
	}, [commented]);

	const loadedPostPage = (
		<>
			{showEditForm ? (
				<PostForm edited onSubmit={handlePostEdit} />
			) : null}
			{postLock ? lockMessage : null}
			<RequireOwnerComponents
				userId={post.userId}
				allowedRoles={[`admin`]}
			>
				<ConfirmButton
					actionHandler={handlePostDelete}
					locked={Boolean(postLock)}
				>
					Delete post
				</ConfirmButton>
				<ConfirmButton
					actionHandler={handlePostEdit}
					locked={Boolean(postLock)}
				>
					Edit post
				</ConfirmButton>
			</RequireOwnerComponents>
			<RequireAuthComponents allowedRoles={[`admin`]}>
				{postLock ? (
					<ConfirmButton actionHandler={handlePostUnlock}>
						Unlock
					</ConfirmButton>
				) : (
					<ConfirmButton actionHandler={handlePostLock}>
						Lock 1d
					</ConfirmButton>
				)}
			</RequireAuthComponents>
			<h2>{post.title}</h2>
			<p>{post.content}</p> <br />
			<UserMinify user={post.author} />
			<br />
			<div>
				<h3>Answers:</h3>
				<CommentsSection onCommentAdd={refresh} />
			</div>
			<CommentForm
				postId={post.id}
				onSubmit={refresh}
				locked={Boolean(postLock)}
			/>
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
