import { Field, Form, Formik } from "formik";
import SubmitButton from "../../buttons/SubmitButton";
import Dropdown from "../../Dropdown";

export default function CategoriesSearchForm({ onSubmit }) {
	const handleSearch = async (values) => {
		if (onSubmit) onSubmit(values);
	};

	const categoriesSortOptions = [`A->Z`, `Z->A`];

	const categoriesSearchForm = (
		<>
			<Formik
				initialValues={{
					search: ``,
					sort: categoriesSortOptions[0],
					checkboxes: [],
				}}
				onSubmit={handleSearch}
			>
				<Form>
					<Field name="search" placeholder="Search" />
					<SubmitButton value="Search" alwaysOn />
					<Dropdown name="sort" options={categoriesSortOptions} />
				</Form>
			</Formik>
		</>
	);

	return categoriesSearchForm;
}
