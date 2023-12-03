import { Link } from "react-router-dom";
import UserMinify from "./UserMinify";

export default function Post({ post }) {
	return (
		<article>
			<Link to={`/post/${post.id}`}>
				<h2>{post.title}</h2>
				<p>Rating: {post.rating}</p>
			</Link>
			<UserMinify user={post.author} />
		</article>
	);
}
