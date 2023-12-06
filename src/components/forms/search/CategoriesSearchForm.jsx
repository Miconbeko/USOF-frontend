import { Field, Form, Formik } from "formik";
import SubmitButton from "../../buttons/SubmitButton";
import Dropdown from "../../Dropdown";
import { useState } from "react";
import PaginationButtons from "../../PaginationButtons";

export default function CategoriesSearchForm({ onSubmit, paginationData }) {
	const [page, setPage] = useState(paginationData?.currentPage);

	const handleSearch = async (values) => {
		if (onSubmit) onSubmit({ ...values, page });
	};

	const toNewPage = async (page) => {
		setPage(page);
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
					<PaginationButtons
						paginationData={paginationData}
						onClick={toNewPage}
					/>
				</Form>
			</Formik>
		</>
	);

	return categoriesSearchForm;
}
