import { useDispatch, useSelector } from "react-redux";
import { getError, getStatus, selectAuth } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../store/slices/postSlice";

export default function PostDeleteButton({
	post,
	children,
	errHandler = console.error,
}) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handlePostDelete = async () => {
		try {
			await dispatch(deletePost({ id: post.id })).unwrap();

			navigate(`/`);
		} catch (err) {
			errHandler(err.message);
		}
	};

	return <button onClick={handlePostDelete}>{children}</button>;
}
