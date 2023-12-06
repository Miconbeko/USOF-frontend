export default function PaginationButtons({ paginationData, onClick }) {
	if (!paginationData) return;

	const cp = paginationData.currentPage;
	const tp = paginationData.totalPages;

	return (
		<>
			<button
				type="submit"
				onClick={() => onClick(1)}
				disabled={cp === 1}
			>{`<<`}</button>
			<button
				type="submit"
				onClick={() => onClick(cp - 1)}
				disabled={cp === 1}
			>{`<`}</button>
			<button type="submit" disabled>
				{cp}
			</button>
			<button
				type="submit"
				onClick={() => onClick(cp + 1)}
				disabled={cp === tp}
			>{`>`}</button>
			<button
				type="submit"
				onClick={() => onClick(tp)}
				disabled={cp === tp}
			>{`>>`}</button>
		</>
	);
}
