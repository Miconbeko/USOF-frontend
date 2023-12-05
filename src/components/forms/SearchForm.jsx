import { useState } from "react";
import { Field, Form, Formik } from "formik";
import SubmitButton from "../buttons/SubmitButton";
import Dropdown from "../Dropdown";

export default function SearchForm({ type, onSubmit }) {
	const [showFilters, setShowFilters] = useState(false);

	const handleSearch = async (values) => {
		if (onSubmit) onSubmit(values);
	};

	const postSortOptions = [`Newest`, `Oldest`, `Most rated`, `Least rated`];

	const postsSearchForm = (
		<>
			<Formik
				initialValues={{
					search: ``,
					sort: postSortOptions[0],
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
					<Dropdown name="sort" options={postSortOptions} />
				</Form>
			</Formik>
		</>
	);

	if (type === `posts`) return postsSearchForm;
}
