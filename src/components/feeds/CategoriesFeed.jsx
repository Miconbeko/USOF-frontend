import { useEffect, useState } from "react";
import api from "../../utils/api";
import Loading from "../Loading";
import CategoryMinify from "../CategoryMinify";
import CategoriesSearchForm from "../forms/search/CategoriesSearchForm";
import { nanoid } from "@reduxjs/toolkit";
import {
	createFilterQuery,
	createPageQuery,
	createSortQuery,
} from "../../utils/createQueries";
import RequireAuthComponents from "../wrappers/RequireAuthComponents";
import ToggleButton from "../buttons/ToggleButton";
import CategoryForm from "../forms/CategoryForm";

export default function CategoriesFeed({ onCategoryClick }) {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errMsg, setErrMsg] = useState(``);
	const [refresh, setRefresh] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false);

	const [search, setSearch] = useState(``);
	const [sort, setSort] = useState(`A->Z`);
	const [page, setPage] = useState(1);

	const [paginationData, setPaginationData] = useState({});

	const handleShowAddForm = () => {
		setShowAddForm(!showAddForm);
	};

	const handleAdd = () => {
		setRefresh(nanoid());
		handleShowAddForm();
	};

	const handleSearch = async (values) => {
		setSearch(values.search);
		setSort(values.sort);
		setPage(values.page);
		setRefresh(nanoid());
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await api.get(api.routes.allCategories, {
					params: {
						filter: createFilterQuery({ search }),
						sort: createSortQuery({ sort }),
						page: createPageQuery({ page }),
					},
				});

				setPaginationData(res.data.pagination);
				setCategories(res.data.categories);
			} catch (err) {
				api.catcher(err, setErrMsg);
			}
			setLoading(false);
		};

		fetchCategories();
	}, [refresh]);

	return (
		<>
			{showAddForm ? <CategoryForm onSubmit={handleAdd} /> : null}
			<RequireAuthComponents allowedRoles={[`admin`]}>
				<ToggleButton withoutWarning actionHandler={handleShowAddForm}>
					Add
				</ToggleButton>{" "}
				<br />
			</RequireAuthComponents>
			Categories: <br />
			<CategoriesSearchForm
				paginationData={paginationData}
				onSubmit={handleSearch}
			/>
			{(() => {
				if (loading) return <Loading />;
				if (errMsg) return <p>{errMsg}</p>;
				if (categories && categories.length)
					return categories.map((category) => (
						<div key={category.id}>
							<CategoryMinify category={category} />
							{onCategoryClick ? (
								<button
									onClick={() => {
										onCategoryClick(category);
									}}
								>
									Add
								</button>
							) : null}
							<br />
						</div>
					));
				return <p>There is no categories :( </p>;
			})()}
		</>
	);
}
