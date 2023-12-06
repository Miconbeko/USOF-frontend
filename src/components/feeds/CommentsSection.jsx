import { useSelector } from "react-redux";
import { selectPost } from "../../store/slices/postSlice";
import Comment from "../Comment";

export default function CommentsSection({
	parentCommentId = null,
	onCommentAdd,
}) {
	const comments = useSelector(selectPost).comments;
	const filteredComments = comments?.filter(
		(comment) => comment.commentId === parentCommentId,
	);

	// console.log(parentCommentId);
	// console.log(filteredComments);

	return (
		<>
			{filteredComments?.map((comment) => (
				<div
					className={"pl-4 border-l-2 border-teal-600"}
					key={comment.id}
				>
					<Comment comment={comment} onCommentAdd={onCommentAdd} />
					<div className={"ml-4"}>
						<CommentsSection
							parentCommentId={comment.id}
							onCommentAdd={onCommentAdd}
						/>
					</div>
				</div>
			))}
		</>
	);
}
