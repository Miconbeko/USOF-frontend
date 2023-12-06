import * as yup from "yup";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Field, Form, Formik } from "formik";
import ErrorMessage from "../ErrorMessage";
import SubmitButton from "../buttons/SubmitButton";
import { useNavigate } from "react-router-dom";

const categorySchema = yup.object({
	title: yup
		.string()
		.trim()
		.min(1, `1 to 40 characters. All characters allowed`)
		.max(40, `10 to 40 characters. All characters allowed`),
	content: yup
		.string()
		.trim()
		.min(10, `10 to 1000 characters. All characters allowed`)
		.max(1000, `10 to 1000 characters. All characters allowed`),
});

export default function CategoryForm({ edited = false, categoryId, onSubmit }) {
	const [category, setCategory] = useState({ title: ``, content: `` });
	const [errMsg, setErrMsg] = useState(``);
	const navigate = useNavigate();

	const handleCategory = async (values) => {
		try {
			const res = api.post(api.routes.createCategory, values);

			navigate(`/`);
			// if (onSubmit) {
			// 	onSubmit();
			// }
		} catch (err) {
			setErrMsg(err.message);
			api.catcher(err);
		}
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await api.get(api.routes.categoryById(categoryId));

				setCategory(res.data.category);
			} catch (err) {
				api.catcher(err);
			}
		};

		fetchUser();
	}, []);

	const categoryForm = (
		<>
			<Formik
				initialValues={{
					title: edited ? category.title : ``,
					content: edited ? category.content : ``,
				}}
				validationSchema={categorySchema}
				onSubmit={handleCategory}
			>
				<Form>
					<p>{errMsg}</p>
					<label htmlFor="title">Title:</label>
					<Field name="title" />
					<ErrorMessage name="title" /> <br />
					<label htmlFor="content">Description:</label>
					<Field name="content" as="textarea" />
					<ErrorMessage name="content" /> <br />
					<SubmitButton value={edited ? "Edit" : "Save"} />
				</Form>
			</Formik>
		</>
	);

	return categoryForm;
}
