export function createFilterQuery({
	search = ``,
	checkboxes = [],
	categories = null,
}) {
	let options = [];
	let str;

	if (search) options.push(`search[${search}]`);
	if (checkboxes.includes(`noComments`)) options.push(`nocomments[]`);
	if (checkboxes.includes(`admins`)) options.push(`admins[]`);
	if (checkboxes.includes(`users`)) options.push(`users[]`);
	if (categories) options.push(`categories[${categories.join(`,`)}]`);

	str = options.join(`,`);

	if (str) return str;
	return null;
}

export function createSortQuery({ sort }) {
	let options = [];
	let str;

	if (!sort) return null;

	if (sort === `Newest`) options.push(`date[desc]`);
	if (sort === `Oldest`) options.push(`date[asc]`);
	if (sort === `Most rated`) options.push(`rating[desc]`);
	if (sort === `Least rated`) options.push(`rating[asc]`);
	if (sort === `A->Z`) options.push(`name[asc]`);
	if (sort === `Z->A`) options.push(`name[desc]`);

	str = options.join(`,`);

	if (str) return str;
	return null;
}

export function createPageQuery({ page }) {
	return page;
}
