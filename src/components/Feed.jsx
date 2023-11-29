import { useEffect, useState } from "react";
import api from "../utils/api";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts } from "../store/slices/postsSlice";

export default function Feed() {
	const posts = useSelector(selectAllPosts);
	const dispatch = useDispatch();

	// const [posts, setPosts] = useState([])

	// useEffect(() => {
	//     const fetchPosts = async () => {
	//         try {
	//             const res = await api.get(api.routes.allPosts)
	//
	//             setPosts(res.data.posts)
	//         } catch (err) {
	//             if (err.response) {
	//                 // The request was made and the server responded with a status code
	//                 // that falls out of the range of 2xx
	//                 console.error(err.response.data.message)
	//                 // console.log(err.response.data);
	//                 // console.log(err.response.status);
	//                 // console.log(err.response.headers);
	//             } else if (err.request) {
	//                 // The request was made but no response was received
	//                 // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
	//                 // http.ClientRequest in node.js
	//                 console.error(`Server didn't respond`)
	//                 // console.log(err.request);
	//             } else {
	//                 // Something happened in setting up the request that triggered an Error
	//                 console.error(`Internal server error`)
	//                 // console.log('Error', err.message);
	//             }
	//             // console.log(err.config);
	//         }
	//
	//     }
	//
	//     fetchPosts()
	// }, []);

	return (
		<>
			Feed <br />
			{posts && posts.length ? (
				posts.map((post) => <Post key={post.id} post={post} />)
			) : (
				<p>There is no posts :( </p>
			)}
		</>
	);
}
