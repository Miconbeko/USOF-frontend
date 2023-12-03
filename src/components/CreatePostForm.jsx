import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { post } from "axios";
import ErrorMessage from "./ErrorMessage";
import SubmitButton from "./SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	createPost,
	getError,
	getStatus,
	selectPost,
} from "../store/slices/postSlice";
import { useState } from "react";

const postSchema = yup.object({
	title: yup
		.string()
		.trim()
		.min(10, `10 to 150 characters. All characters allowed`)
		.max(150, `10 to 150 characters. All characters allowed`),
	content: yup
		.string()
		.trim()
		.min(10, `10 to 65530 characters. All characters allowed`)
		.max(65530, `10 to 65530 characters. All characters allowed`),
});

export default function CreatePostForm() {
	const post = useSelector(selectPost);
	const postStatus = useSelector(getStatus);
	const postError = useSelector(getError);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [errMsg, setErrMsg] = useState(``);

	const handlePostCreation = async (values) => {
		dispatch(createPost(values))
			.unwrap()
			.then((payload) => {
				navigate(`/post/${payload.post.id}`);
			})
			.catch((err) => {
				setErrMsg(err.message);
			});
	};

	return (
		<Formik
			initialValues={{
				title: ``,
				content: ``,
			}}
			validationSchema={postSchema}
			onSubmit={handlePostCreation}
		>
			<Form>
				<p>{errMsg}</p>
				<label htmlFor="title">Title:</label>
				<Field name="title" />
				<ErrorMessage name="title" /> <br />
				<label htmlFor="content">Question:</label>
				<Field name="content" as="textarea" />
				<ErrorMessage name="content" /> <br />
				<SubmitButton value="Create" />
			</Form>
		</Formik>
	);
}
