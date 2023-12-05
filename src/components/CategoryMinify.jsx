export default function CategoryMinify({ category }) {
	return (
		<div>
			<h5>{category.title}</h5>
			<p>{category.content}</p>
		</div>
	);
}
