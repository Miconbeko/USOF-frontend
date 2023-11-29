import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { post } from "axios";
import ErrorMessage from "./ErrorMessage";
import SubmitButton from "./SubmitButton";
import { useDispatch } from "react-redux";
import { addPost } from "../store/slices/postsSlice";
import { useNavigate } from "react-router-dom";

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
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handlePostCreation = async (values) => {
		dispatch(addPost(values.title, values.content));
		navigate(`/`);
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
