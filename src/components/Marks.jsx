import { useEffect, useState } from "react";

export default function Marks({
	mark = ``,
	onSetLike,
	onUndoLike,
	onSetDislike,
	onUndoDislike,
}) {
	const [localMark, setLocalMark] = useState(``);

	const handleLike = async () => {
		if (mark === `like`) return onUndoLike();
		onSetLike();
	};

	const handleDislike = async () => {
		if (mark === `dislike`) return onUndoDislike();
		onSetDislike();
	};

	useEffect(() => {
		setLocalMark(mark);
	}, []);

	return (
		<>
			<button onClick={handleLike}>Like</button> <br />
			<button onClick={handleDislike}>Dislike</button> <br />
			<span>{mark}</span>
		</>
	);
}
