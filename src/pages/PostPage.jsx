import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteMark,
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
	setDislike,
	setLike,
	unlockPost,
} from "../store/slices/postSlice";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import UserMinify from "../components/UserMinify";
import CommentForm from "../components/forms/CommentForm";
import { nanoid } from "@reduxjs/toolkit";
import RequireOwnerComponents from "../components/wrappers/RequireOwnerComponents";
import ToggleButton from "../components/buttons/ToggleButton";
import RequireAuthComponents from "../components/wrappers/RequireAuthComponents";
import PostForm from "../components/forms/PostForm";
import Comment from "../components/Comment";
import CommentsSection from "../components/feeds/CommentsSection";
import api from "../utils/api";
import Marks from "../components/Marks";

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

	const handleSetLike = async () => {
		try {
			const res = await api.post(api.routes.setPostLike(post.id));
			dispatch(setLike());
		} catch (err) {
			console.error(err);
		}
	};

	const handleUndoLike = async () => {
		try {
			const res = await api.delete(api.routes.undoPostLike(post.id));
			dispatch(deleteMark());
		} catch (err) {
			console.error(err);
		}
	};

	const handleSetDislike = async () => {
		try {
			const res = await api.post(api.routes.setPostDislike(post.id));
			dispatch(setDislike());
		} catch (err) {
			console.error(err);
		}
	};

	const handleUndoDislike = async () => {
		try {
			const res = await api.delete(api.routes.undoPostDislike(post.id));
			dispatch(deleteMark());
		} catch (err) {
			console.error(err);
		}
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
				<ToggleButton
					actionHandler={handlePostDelete}
					locked={Boolean(postLock)}
				>
					Delete post
				</ToggleButton>
				<ToggleButton
					actionHandler={handlePostEdit}
					locked={Boolean(postLock)}
					withoutWarning
				>
					Edit post
				</ToggleButton>
			</RequireOwnerComponents>
			<RequireAuthComponents allowedRoles={[`admin`]}>
				{postLock ? (
					<ToggleButton actionHandler={handlePostUnlock}>
						Unlock
					</ToggleButton>
				) : (
					<ToggleButton actionHandler={handlePostLock}>
						Lock 1d
					</ToggleButton>
				)}
			</RequireAuthComponents>
			<h2>{post.title}</h2>
			<p>{post.content}</p> <br />
			<UserMinify user={post.author} />
			<RequireAuthComponents>
				<Marks
					mark={post?.Marks?.at(0)?.type}
					onSetLike={handleSetLike}
					onSetDislike={handleSetDislike}
					onUndoLike={handleUndoLike}
					onUndoDislike={handleUndoDislike}
				/>
			</RequireAuthComponents>
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
