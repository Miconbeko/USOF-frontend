import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialState = {
	post: {
		title: ``,
		content: ``,
		comments: [],
		author: {},
	},
	status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
};

export const fetchPost = createAsyncThunk(`post/fetchPost`, async (params) => {
	try {
		const postResponse = await api.get(api.routes.postById(params.id));

		try {
			const userResponse = await api.get(
				api.routes.userById(postResponse.data.post.userId),
			);

			postResponse.data.post.author = userResponse.data.user;
		} catch (err) {
			console.error(err);
		}

		return postResponse.data;
	} catch (err) {
		api.catcher(err, (msg) => {
			throw new Error(msg);
		});
	}
});

export const fetchComments = createAsyncThunk(
	`post/fetchComments`,
	async (params) => {
		try {
			const res = await api.get(api.routes.commentsToPost(params.id));

			// console.log(res.data);
			return res.data;
		} catch (err) {
			api.catcher(err, (msg) => {
				throw new Error(msg);
			});
		}
	},
);

export const fetchPostAndComments = createAsyncThunk(
	`post/fetchPostAndComments`,
	async (params, { dispatch }) => {
		dispatch(fetchPost(params));
		dispatch(fetchComments(params));
	},
);

export const postSlice = createSlice({
	name: `post`,
	initialState,
	extraReducers(builder) {
		builder
			.addCase(fetchPost.pending, (state, action) => {
				state.error = null;
				state.status = `loading`;
			})
			.addCase(fetchPost.fulfilled, (state, action) => {
				const comments = state.post.comments;

				state.status = `success`;
				state.post = action.payload.post;
				state.post.comments = comments;
			})
			.addCase(fetchPost.rejected, (state, action) => {
				state.status = `failed`;
				state.error = action.error.message;
			})

			.addCase(fetchComments.pending, (state, action) => {
				state.error = null;
				state.status = `loading`;
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.status = `success`;
				state.post.comments = action.payload.comments;
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.status = `failed`;
				state.error = action.error.message;
			});
	},
});

export const selectPost = (state) => state.post.post;
export const getStatus = (state) => state.post.status;
export const getError = (state) => state.post.error;

export default postSlice.reducer;
