import UserMinify from "./UserMinify";
import RequireAuthComponents from "./wrappers/RequireAuthComponents";
import { useState } from "react";
import CommentForm from "./forms/CommentForm";
import { nanoid } from "@reduxjs/toolkit";

export default function Comment({ comment, onCommentAdd }) {
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
				<button onClick={handleShowForm}>Comment</button>
			</RequireAuthComponents>
			<UserMinify user={comment.author} />
			{showCommnetForm ? (
				<CommentForm commentId={comment.id} onSubmit={handleComment} />
			) : null}
			<br />
		</div>
	);
}
