import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
	{
		id: 1,
		title: "First post",
		content: "Lorem ipsum do lores abran",
		rating: 0,
		createdAt: "2023-11-25T13:19:38.000Z",
		updatedAt: "2023-11-25T13:19:38.000Z",
		userId: 1,
		lock: null,
		// categories: [
		//     {
		//         id: 1,
		//         title: "node.js",
		//         content: "yaayyayayay"
		//     }
		// ]
	},
	{
		id: 2,
		title: "Second post",
		content: "Lorem ipsum do lores abran",
		rating: 0,
		createdAt: "2023-11-25T13:19:41.000Z",
		updatedAt: "2023-11-25T13:19:41.000Z",
		userId: 1,
		lock: null,
		// categories: [
		// {
		//     "id": 1,
		//     "title": "node.js",
		//     "content": "yaayyayayay"
		// }
		// ]
	},
];

export const postsSlice = createSlice({
	name: `posts`,
	initialState,
	reducers: {
		addPost: {
			reducer: (state, action) => {
				state.push(action.payload);
			},
			prepare: (title, content) => {
				return {
					payload: {
						title,
						content,
						id: nanoid(),
					},
				};
			},
		},
	},
});

export const selectAllPosts = (state) => state.posts;

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
