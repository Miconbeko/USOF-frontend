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
		api.catcher(err, api.errorHandlers.rethrow);
	}
});

export const fetchComments = createAsyncThunk(
	`post/fetchComments`,
	async (params) => {
		try {
			const res = await api.get(api.routes.commentsToPost(params.id));

			return res.data;
		} catch (err) {
			api.catcher(err, api.errorHandlers.rethrow);
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

export const createPost = createAsyncThunk(`post/create`, async (params) => {
	try {
		const res = await api.post(api.routes.createPost, {
			...params,
			categories: [1, 2],
		});

		return res.data;
	} catch (err) {
		api.catcher(err, api.errorHandlers.rethrow);
	}
});

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

				state.status = `succeeded`;
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
				state.status = `succeeded`;
				state.post.comments = action.payload.comments;
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.status = `failed`;
				state.error = action.error.message;
			})

			.addCase(createPost.pending, (state, action) => {
				state.error = null;
				state.status = `loading`;
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.status = `succeeded`;
				state.post = action.payload.post;
			})
			.addCase(createPost.rejected, (state, action) => {
				state.status = `failed`;
				state.error = action.error.message;
			});
	},
});

export const selectPost = (state) => state.post.post;
export const getStatus = (state) => state.post.status;
export const getError = (state) => state.post.error;

export default postSlice.reducer;
