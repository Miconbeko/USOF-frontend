import { useDispatch, useSelector } from "react-redux";
import { getError, getStatus, selectAuth } from "../../store/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import ErrorMessage from "../ErrorMessage";
import SubmitButton from "../buttons/SubmitButton";
import Loading from "../Loading";
import api from "../../utils/api";

const commentSchema = yup.object({
	content: yup
		.string()
		.trim()
		.min(10, `10 to 65530 characters. All characters allowed`)
		.max(65530, `10 to 65530 characters. All characters allowed`),
});

export default function CommentForm({
	postId,
	commentId,
	onSubmit,
	edited = false,
	locked = false,
}) {
	const auth = useSelector(selectAuth);
	const authStatus = useSelector(getStatus);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [errMsg, setErrMsg] = useState(``);
	const [comment, setComment] = useState(``);
	const inputRef = useRef(null);

	const handleComment = async (values) => {
		try {
			let res;

			if (edited && Number.isFinite(commentId)) {
				res = await api.put(api.routes.editComment(commentId), values);
			} else if (Number.isFinite(commentId))
				res = await api.post(
					api.routes.createComment(commentId),
					values,
				);
			else res = await api.post(api.routes.createAnswer(postId), values);

			if (onSubmit) onSubmit();
		} catch (err) {
			api.catcher(err, setErrMsg);
		}
	};

	useEffect(() => {
		const fetchComment = async () => {
			try {
				const res = await api.get(api.routes.commentById(commentId));

				setComment(res.data.comment.content);
			} catch (err) {
				api.catcher(err);
			}
		};

		fetchComment();
	}, []);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [inputRef]);

	const form = (
		<Formik
			initialValues={{ content: comment }}
			enableReinitialize={true}
			validationSchema={commentSchema}
			onSubmit={handleComment}
		>
			<Form>
				<p>{errMsg}</p>
				<Field
					name="content"
					as="textarea"
					innerRef={inputRef}
					disabled={locked}
				/>
				<ErrorMessage name="content" /> <br />
				<SubmitButton
					value={
						Number.isFinite(commentId)
							? edited
								? "Edit comment"
								: "Add comment"
							: edited
							  ? "Edit answer"
							  : "Post an answer"
					}
				/>
			</Form>
		</Formik>
	);

	return (
		<>
			{(() => {
				if (authStatus === `loading`) return <Loading />;
				if (authStatus === `succeeded`) return form;
				return;
			})()}
		</>
	);
}
