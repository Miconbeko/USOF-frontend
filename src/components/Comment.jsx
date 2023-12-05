import UserMinify from "./UserMinify";
import RequireAuthComponents from "./wrappers/RequireAuthComponents";
import { useState } from "react";
import CommentForm from "./forms/CommentForm";
import { nanoid } from "@reduxjs/toolkit";
import ToggleButton from "./buttons/ToggleButton";
import { useSelector } from "react-redux";
import { getPostLock } from "../store/slices/postSlice";
import RequireOwnerComponents from "./wrappers/RequireOwnerComponents";

export default function Comment({ comment, onCommentAdd }) {
	const postLock = useSelector(getPostLock);
	const [showCommnetForm, setShowCommentForm] = useState(false);
	const [edit, setEdit] = useState(false);

	const handleShowAddForm = async () => {
		setEdit(true);
		setShowCommentForm(!showCommnetForm);
	};

	const handleShowEditForm = async () => {
		setEdit(true);
		setShowCommentForm(!showCommnetForm);
	};

	const handleComment = async () => {
		setShowCommentForm(false);
		if (onCommentAdd) onCommentAdd();
	};

	return (
		<div>
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
				userId={comment.author.id}
				allowedRoles={[`admin`]}
			>
				<ToggleButton
					actionHandler={handleShowEditForm}
					withoutWarning
					locked={Boolean(postLock)}
				>
					Edit
				</ToggleButton>
			</RequireOwnerComponents>
			<UserMinify user={comment.author} />
			{showCommnetForm ? (
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
		</div>
	);
}
