import { Field, Form, Formik } from "formik";
import SubmitButton from "../../buttons/SubmitButton";
import Dropdown from "../../Dropdown";

export default function PostsSearchForm({ onSubmit }) {
	const handleSearch = async (values) => {
		if (onSubmit) onSubmit(values);
	};

	const postsSortOptions = [`Newest`, `Oldest`, `Most rated`, `Least rated`];

	const postsSearchForm = (
		<>
			<Formik
				initialValues={{
					search: ``,
					sort: postsSortOptions[0],
					checkboxes: [],
					categories: ``,
				}}
				onSubmit={handleSearch}
			>
				<Form>
					<Field name="search" placeholder="Search" />
					<SubmitButton value="Search" alwaysOn />
					<label>
						<Field
							type="checkbox"
							name="checkboxes"
							value="noComments"
						/>
						No comments
					</label>
					<Dropdown name="sort" options={postsSortOptions} />
				</Form>
			</Formik>
		</>
	);

	return postsSearchForm;
}
