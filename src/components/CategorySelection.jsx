import { useField, useFormik } from "formik";
import CategoryMinify from "./CategoryMinify";
import CategoriesFeed from "./feeds/CategoriesFeed";
import { useState } from "react";

export default function CategorySelection({ onCategoriesAdd }) {
	const [field, setField] = useState([]);

	const handleAddCategory = (category) => {
		setField([...field, category]);
		onCategoriesAdd([...field, category]);
	};

	return (
		<>
			<div>
				<CategoriesFeed onCategoryClick={handleAddCategory} />
			</div>
			<div>
				{field?.map((selectedCategory) => (
					<div key={selectedCategory.id}>
						<CategoryMinify category={selectedCategory} /> <br />
					</div>
				))}
			</div>
		</>
	);
}
