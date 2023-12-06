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

	const handleRemoveCategory = (category) => {
		const newArray = field.filter((selected) => selected !== category);

		setField(newArray);
		onCategoriesAdd(newArray);
	};

	return (
		<>
			<div>
				<CategoriesFeed
					onCategoryAdd={handleAddCategory}
					onCategoryRemove={handleRemoveCategory}
					selectedCategories={field}
				/>
			</div>
			<div>
				Selected categories:
				{field?.map((selectedCategory) => (
					<div key={selectedCategory.id}>
						<CategoryMinify category={selectedCategory} /> <br />
					</div>
				))}
			</div>
		</>
	);
}
