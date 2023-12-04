import { useDispatch, useSelector } from "react-redux";
import { getError, getStatus, selectAuth } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../store/slices/postSlice";
import { useState } from "react";

export default function ConfirmButton({
	children,
	actionHandler,
	undoHandler = actionHandler,
	withoutWarning,
	locked = false,
}) {
	const [state, setState] = useState(0);
	const maxStates = withoutWarning ? 1 : 2;

	const handleAsk = async () => {
		if (locked) return;

		if (state === maxStates) {
			undoHandler();
			setState(0);

			return;
		}

		if (state === maxStates - 1) {
			actionHandler();
		}

		setState(state + 1);
	};

	const setWarning = async () => {
		setState(1);
	};

	return (
		<>
			{state !== 0 ? (
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
