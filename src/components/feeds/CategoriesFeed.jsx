import { useEffect, useState } from "react";
import api from "../../utils/api";
import Loading from "../Loading";
import CategoryMinify from "../CategoryMinify";
import CategoriesSearchForm from "../forms/search/CategoriesSearchForm";
import { nanoid } from "@reduxjs/toolkit";
import { createFilterQuery, createSortQuery } from "../../utils/createQueries";

export default function CategoriesFeed() {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errMsg, setErrMsg] = useState(``);
	const [refresh, setRefresh] = useState(null);

	const [search, setSearch] = useState(``);
	const [sort, setSort] = useState(`A->Z`);

	const handleSearch = async (values) => {
		setSearch(values.search);
		setSort(values.sort);
		setRefresh(nanoid());
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await api.get(api.routes.allCategories, {
					params: {
						filter: createFilterQuery({ search }),
						sort: createSortQuery({ sort }),
					},
				});

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
			Categories: <br />
			<CategoriesSearchForm onSubmit={handleSearch} />
			{(() => {
				if (loading) return <Loading />;
				if (errMsg) return <p>{errMsg}</p>;
				if (categories && categories.length)
					return categories.map((category) => (
						<div key={category.id}>
							<CategoryMinify category={category} />
							<br />
						</div>
					));
				return <p>There is no categories :( </p>;
			})()}
		</>
	);
}
