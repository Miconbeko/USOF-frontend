import { useDispatch, useSelector } from "react-redux";
import { getError, getStatus, selectAuth } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../store/slices/postSlice";
import { useState } from "react";

export default function ConfirmButton({ children, actionHandler }) {
	const [ask, setAsk] = useState(false);

	const handleAsk = async () => {
		setAsk(true);
	};

	return (
		<>
			{ask ? (
				<button
					onClick={actionHandler}
					className={"bg-amber-600 hover:bg-amber-500"}
				>
					{children}
				</button>
			) : (
				<button onClick={handleAsk}>{children}</button>
			)}
		</>
	);
}
