export default function Post({ post }) {
    return (
        <article>
            <h2>{post.title}</h2>
            <p>Rating: {post.rating}</p> <br/>
        </article>
    )
}