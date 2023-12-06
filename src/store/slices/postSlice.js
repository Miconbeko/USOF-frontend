import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { logout } from "./authSlice";

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

export const fetchPost = createAsyncThunk(
	`post/fetchPost`,
	async (params, { dispatch }) => {
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

			if (postResponse.data.post.lock) {
				postResponse.data.post.lock.author =
					postResponse.data.post.lock.owner;
				delete postResponse.data.post.lock.owner;
			}

			return postResponse.data;
		} catch (err) {
			api.catcher(err, api.errorHandlers.rethrow);
		}
	},
);

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
			// categories: [1, 2],
		});

		return res.data;
	} catch (err) {
		api.catcher(err, api.errorHandlers.rethrow);
	}
});

export const deletePost = createAsyncThunk(`post/delete`, async (params) => {
	try {
		const res = await api.delete(api.routes.deletePost(params.id));

		return res.data;
	} catch (err) {
		api.catcher(err, api.errorHandlers.rethrow);
	}
});

export const lockPost = createAsyncThunk(
	`post/lock`,
	async (params, { dispatch }) => {
		try {
			const res = await api.post(api.routes.lockPost(params.id), {
				timer: params.timer,
			});

			return res.data;
		} catch (err) {
			api.catcher(err, api.errorHandlers.rethrow);
		}
	},
);

export const unlockPost = createAsyncThunk(
	`post/unlock`,
	async (params, { dispatch }) => {
		try {
			const res = await api.delete(api.routes.unlockPost(params.id));

			return res.data;
		} catch (err) {
			api.catcher(err, api.errorHandlers.rethrow);
		}
	},
);

export const editPost = createAsyncThunk(`post/edit`, async (params) => {
	try {
		console.log({ ...params.values });
		const res = await api.put(api.routes.editPost(params.id), {
			...params.values,
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
	reducers: {
		setLike(state, action) {
			if (!state.post.Marks.length) state.post.Marks.push({ type: `` });
			state.post.Marks[0].type = `like`;
		},
		setDislike(state, action) {
			if (!state.post.Marks.length) state.post.Marks.push({ type: `` });
			state.post.Marks[0].type = `dislike`;
		},
		deleteMark(state, action) {
			if (!state.post.Marks.length) state.post.Marks.push({ type: `` });
			state.post.Marks[0].type = ``;
		},
	},
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
			})

			.addCase(deletePost.pending, (state, action) => {
				state.error = null;
				state.status = `loading`;
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.status = `idle`;
				state.post = {};
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.status = `failed`;
				state.error = action.error.message;
			})

			.addCase(lockPost.pending, (state, action) => {
				state.error = null;
				state.status = `loading`;
			})
			.addCase(lockPost.fulfilled, (state, action) => {
				const comments = state.post.comments;
				const author = state.post.author;

				state.status = `succeeded`;
				state.post = action.payload.post;
				state.post.lock = action.payload.lock;
				state.post.comments = comments;
				state.post.author = author;
			})
			.addCase(lockPost.rejected, (state, action) => {
				state.status = `failed`;
				state.error = action.error.message;
			})

			.addCase(unlockPost.pending, (state, action) => {
				state.error = null;
				state.status = `loading`;
			})
			.addCase(unlockPost.fulfilled, (state, action) => {
				state.status = `succeeded`;
				state.post.lock = null;
			})
			.addCase(unlockPost.rejected, (state, action) => {
				state.status = `failed`;
				state.error = action.error.message;
			})

			.addCase(editPost.pending, (state, action) => {
				state.error = null;
				state.status = `loading`;
			})
			.addCase(editPost.fulfilled, (state, action) => {
				const comments = state.post.comments;
				const lock = state.post.lock;
				const author = state.post.author;

				state.status = `succeeded`;
				state.post = action.payload.post;
				state.post.comments = comments;
				state.post.lock = lock;
				state.post.author = author;
			})
			.addCase(editPost.rejected, (state, action) => {
				state.status = `failed`;
				state.error = action.error.message;
			});
	},
});

export const selectPost = (state) => state.post.post;
export const getPostLock = (state) => state.post.post.lock;
export const getStatus = (state) => state.post.status;
export const getError = (state) => state.post.error;

export const { setLike, setDislike, deleteMark } = postSlice.actions;

export default postSlice.reducer;
