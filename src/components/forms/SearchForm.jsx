import { useState } from "react";
import { Field, Form, Formik } from "formik";
import SubmitButton from "../buttons/SubmitButton";

export default function SearchForm({ type, onSubmit }) {
	const [showFilters, setShowFilters] = useState(false);

	const handleSearch = async (values) => {
		if (onSubmit) onSubmit(values);
	};

	const postsSearchForm = (
		<>
			<Formik
				initialValues={{
					search: ``,
					sorting: `date`,
					filters: ``,
				}}
				onSubmit={handleSearch}
			>
				<Form>
					<Field name="search" placeholder="Search" />
					<SubmitButton value="Search" alwaysOn />
				</Form>
			</Formik>
		</>
	);

	if (type === `posts`) return postsSearchForm;
}
