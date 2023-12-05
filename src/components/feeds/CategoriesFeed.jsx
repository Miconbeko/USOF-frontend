import { useEffect, useState } from "react";
import api from "../../utils/api";
import Loading from "../Loading";
import CategoryMinify from "../CategoryMinify";

export default function CategoriesFeed() {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errMsg, setErrMsg] = useState(``);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await api.get(api.routes.allCategories);

				setCategories(res.data.categories);
			} catch (err) {
				api.catcher(err, setErrMsg);
			}
			setLoading(false);
		};

		fetchCategories();
	}, []);

	return (
		<>
			Categories: <br />
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
