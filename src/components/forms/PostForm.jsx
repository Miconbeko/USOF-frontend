import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { post } from "axios";
import ErrorMessage from "../ErrorMessage";
import SubmitButton from "../buttons/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	createPost,
	editPost,
	getError,
	getStatus,
	selectPost,
} from "../../store/slices/postSlice";
import { useState } from "react";
import CategorySelection from "../CategorySelection";

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

export default function PostForm({ edited = false, onSubmit, locked = false }) {
	const post = useSelector(selectPost);
	const postStatus = useSelector(getStatus);
	const postError = useSelector(getError);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [errMsg, setErrMsg] = useState(``);
	const [categories, setCategories] = useState([]);
	const [values, setValues] = useState(null);

	const handlePostCreation = async () => {
		try {
			const categoriesIds = [
				...categories.map((category) => category.id),
			];
			const payload = await dispatch(
				createPost({ ...values, categories: categoriesIds }),
			).unwrap();

			navigate(`/post/${payload.post.id}`);
		} catch (err) {
			setErrMsg(err.message);
		}
	};

	const handleSaveValues = async (newValues) => {
		setValues(newValues);
	};

	const handleAddCategories = async (newValues) => {
		setCategories(newValues);
	};

	const handlePostEdit = async (values) => {
		try {
			await dispatch(editPost({ id: post.id, values })).unwrap();

			if (onSubmit) onSubmit();
		} catch (err) {
			setErrMsg(err.message);
		}
	};

	return (
		<>
			<Formik
				initialValues={{
					title: edited ? post.title : ``,
					content: edited ? post.content : ``,
				}}
				validationSchema={postSchema}
				onSubmit={edited ? handlePostEdit : handleSaveValues}
			>
				<Form>
					<p>{errMsg}</p>
					<label htmlFor="title">Title:</label>
					<Field name="title" disabled={locked} />
					<ErrorMessage name="title" /> <br />
					<label htmlFor="content">Question:</label>
					<Field name="content" as="textarea" disabled={locked} />
					<ErrorMessage name="content" /> <br />
					<SubmitButton value={edited ? "Edit" : "Save"} />
				</Form>
			</Formik>
			{edited ? null : (
				<>
					<CategorySelection onCategoriesAdd={handleAddCategories} />
					<button onClick={handlePostCreation}>Create post</button>
				</>
			)}
		</>
	);
}
