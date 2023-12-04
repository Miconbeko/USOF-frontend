import { useDispatch, useSelector } from "react-redux";
import { getError, getStatus, selectAuth } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../store/slices/postSlice";
import { useState } from "react";

export default function ConfirmButton({
	children,
	actionHandler,
	locked = false,
}) {
	const [ask, setAsk] = useState(false);

	const handleAsk = async () => {
		if (locked) return;
		if (ask) actionHandler();
		setAsk(!ask);
	};

	return (
		<>
			{ask ? (
				<button
					onClick={handleAsk}
					className={"bg-amber-600 hover:bg-amber-500"}
					disabled={locked}
				>
					{children}
				</button>
			) : (
				<button onClick={handleAsk} disabled={locked}>
					{children}
				</button>
			)}
		</>
	);
}
