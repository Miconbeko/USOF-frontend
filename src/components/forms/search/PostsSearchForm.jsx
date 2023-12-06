import { Field, Form, Formik } from "formik";
import SubmitButton from "../../buttons/SubmitButton";
import Dropdown from "../../Dropdown";
import { useState } from "react";
import PaginationButtons from "../../PaginationButtons";

export default function PostsSearchForm({ onSubmit, paginationData }) {
	const [page, setPage] = useState(paginationData?.currentPage);

	const handleSearch = async (values) => {
		if (onSubmit) onSubmit({ ...values, page });
	};

	const toNewPage = async (page) => {
		setPage(page);
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
					<PaginationButtons
						paginationData={paginationData}
						onClick={toNewPage}
					/>
				</Form>
			</Formik>
		</>
	);

	return postsSearchForm;
}
