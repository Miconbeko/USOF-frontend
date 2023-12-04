import UserMinify from "./UserMinify";
import RequireAuthComponents from "./wrappers/RequireAuthComponents";
import { useState } from "react";
import CommentForm from "./forms/CommentForm";
import { nanoid } from "@reduxjs/toolkit";
import ConfirmButton from "./buttons/ConfirmButton";
import { useSelector } from "react-redux";
import { getPostLock } from "../store/slices/postSlice";

export default function Comment({ comment, onCommentAdd }) {
	const postLock = useSelector(getPostLock);
	const [showCommnetForm, setShowCommentForm] = useState(false);

	const handleShowForm = async () => {
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
				<ConfirmButton
					actionHandler={handleShowForm}
					withoutWarning
					locked={Boolean(postLock)}
				>
					Comment
				</ConfirmButton>
			</RequireAuthComponents>
			<UserMinify user={comment.author} />
			{showCommnetForm ? (
				<CommentForm commentId={comment.id} onSubmit={handleComment} />
			) : null}
			<br />
		</div>
	);
}
