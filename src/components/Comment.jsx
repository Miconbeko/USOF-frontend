import UserMinify from "./UserMinify";
import RequireAuthComponents from "./wrappers/RequireAuthComponents";
import { useState } from "react";
import CommentForm from "./forms/CommentForm";
import { nanoid } from "@reduxjs/toolkit";
import ToggleButton from "./buttons/ToggleButton";
import { useSelector } from "react-redux";
import { getPostLock } from "../store/slices/postSlice";
import RequireOwnerComponents from "./wrappers/RequireOwnerComponents";
import api from "../utils/api";
import Marks from "./Marks";

export default function Comment({ comment, onCommentAdd }) {
	const postLock = useSelector(getPostLock);
	const [showCommentForm, setShowCommentForm] = useState(false);
	const [edit, setEdit] = useState(false);
	const [mark, setMark] = useState(comment?.Marks?.at(0)?.type);

	const handleShowAddForm = async () => {
		setEdit(false);
		setShowCommentForm(!showCommentForm);
	};

	const handleShowEditForm = async () => {
		setEdit(true);
		setShowCommentForm(!showCommentForm);
	};

	const handleComment = async () => {
		setShowCommentForm(false);
		if (onCommentAdd) onCommentAdd();
	};

	const handleCommentDelete = async () => {
		try {
			const res = await api.delete(api.routes.deleteComment(comment.id));

			if (onCommentAdd) onCommentAdd();
		} catch (err) {
			console.error(err);
		}
	};

	const handleSetLike = async () => {
		try {
			const res = await api.post(api.routes.setCommentLike(comment.id));
			setMark(`like`);
		} catch (err) {
			console.error(err);
		}
	};

	const handleUndoLike = async () => {
		try {
			const res = await api.delete(
				api.routes.undoCommentLike(comment.id),
			);
			setMark(``);
		} catch (err) {
			console.error(err);
		}
	};

	const handleSetDislike = async () => {
		try {
			const res = await api.post(
				api.routes.setCommentDislike(comment.id),
			);
			setMark(`dislike`);
		} catch (err) {
			console.error(err);
		}
	};

	const handleUndoDislike = async () => {
		try {
			const res = await api.delete(
				api.routes.undoCommentDislike(comment.id),
			);
			setMark(``);
		} catch (err) {
			console.error(err);
		}
	};

	const commentContent = (
		<>
			<p>{comment.content}</p>
			<RequireAuthComponents>
				<ToggleButton
					actionHandler={handleShowAddForm}
					withoutWarning
					locked={Boolean(postLock)}
				>
					Comment
				</ToggleButton>
			</RequireAuthComponents>
			<RequireOwnerComponents
				userId={comment?.author?.id}
				allowedRoles={[`admin`]}
			>
				<ToggleButton
					actionHandler={handleCommentDelete}
					locked={Boolean(postLock)}
				>
					Delete
				</ToggleButton>
				<ToggleButton
					actionHandler={handleShowEditForm}
					withoutWarning
					locked={Boolean(postLock)}
				>
					Edit
				</ToggleButton>
			</RequireOwnerComponents>
			<UserMinify user={comment.author} />
			<RequireAuthComponents>
				<Marks
					mark={mark}
					onSetLike={handleSetLike}
					onSetDislike={handleSetDislike}
					onUndoLike={handleUndoLike}
					onUndoDislike={handleUndoDislike}
				/>
			</RequireAuthComponents>
			{showCommentForm ? (
				edit ? (
					<CommentForm
						commentId={comment.id}
						onSubmit={handleComment}
						edited
					/>
				) : (
					<CommentForm
						commentId={comment.id}
						onSubmit={handleComment}
					/>
				)
			) : null}
			<br />
		</>
	);

	const deletedCommentContent = (
		<>
			<p>[Deleted comment]</p>
			<UserMinify user={comment.author} />
			<br />
		</>
	);

	return (
		<div>{comment.content ? commentContent : deletedCommentContent}</div>
	);
}
