import { useDispatch, useSelector } from "react-redux";
import { getError, getStatus, selectAuth } from "../store/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import ErrorMessage from "./ErrorMessage";
import SubmitButton from "./SubmitButton";
import Loading from "./Loading";
import api from "../utils/api";

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
	locked = false,
}) {
	const auth = useSelector(selectAuth);
	const authStatus = useSelector(getStatus);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [errMsg, setErrMsg] = useState(``);
	const inputRef = useRef(null);

	const handleComment = async (values) => {
		try {
			let res;

			if (Number.isFinite(commentId))
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
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [inputRef]);

	const form = (
		<Formik
			initialValues={{ content: `` }}
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
							? "Add comment"
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
