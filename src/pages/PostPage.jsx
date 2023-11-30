import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostPage() {
	const { id } = useParams();
	const posts = useSelector((state) => state.posts);

	const post = posts.find((p) => p.id == id);

	return (
		<>
			<h2>{post.title}</h2>
			<p>{post.content}</p>
		</>
	);
}
