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
		const res = await api.get(api.routes.postById(params.id));

		return res.data;
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

			return res.data;
		} catch (err) {
			api.catcher(err, (msg) => {
				throw new Error(msg);
			});
		}
	},
);

export const postSlice = createSlice({
	name: `post`,
	initialState,
	extraReducers(builder) {
		builder
			.addCase(fetchPost.pending, (state, action) => {
				state.status = `loading`;
			})
			.addCase(fetchPost.fulfilled, (state, action) => {
				state.status = `success`;
				state.post = action.payload.post;
			})
			.addCase(fetchPost.rejected, (state, action) => {
				state.status = `failed`;
				state.error = action.error.message;
			})

			.addCase(fetchComments.pending, (state, action) => {
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
