import { Field, Form, Formik } from "formik";
import SubmitButton from "../../buttons/SubmitButton";
import Dropdown from "../../Dropdown";
import { useState } from "react";
import PaginationButtons from "../../PaginationButtons";

export default function UsersSearchForm({ onSubmit, paginationData }) {
	const [page, setPage] = useState(paginationData?.currentPage);

	const handleSearch = async (values) => {
		if (onSubmit) onSubmit({ ...values, page });
	};

	const toNewPage = async (page) => {
		setPage(page);
	};

	const usersSortOptions = [
		`Newest`,
		`Oldest`,
		`Most rated`,
		`Least rated`,
		`A->Z`,
		`Z->A`,
	];

	const usersSearchForm = (
		<>
			<Formik
				initialValues={{
					search: ``,
					sort: usersSortOptions[0],
					checkboxes: [],
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
							value="admins"
						/>
						Admins
					</label>
					<label>
						<Field
							type="checkbox"
							name="checkboxes"
							value="users"
						/>
						Users
					</label>
					<Dropdown name="sort" options={usersSortOptions} />
					<PaginationButtons
						paginationData={paginationData}
						onClick={toNewPage}
					/>
				</Form>
			</Formik>
		</>
	);

	return usersSearchForm;
}
