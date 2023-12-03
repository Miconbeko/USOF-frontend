import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { fetchPost } from "./postSlice";

const initialState = {
	auth: {},
	status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
};

export const fetchAuth = createAsyncThunk(
	`auth/login`,
	async (params, { getState }) => {
		const state = getState();
		const auth = state.auth.auth;

		if (auth.status === `succeeded`) return auth;

		try {
			const res = await api.post(api.routes.login, params);

			return res.data;
		} catch (err) {
			api.catcher(err, api.errorHandlers.rethrow);
		}
	},
);

export const fetchAuthLocal = createAsyncThunk(`auth/localLogin`, async () => {
	const token = window.localStorage.getItem(`token`);

	if (token) return token;

	throw new Error(`Not login`);
});

export const authSlice = createSlice({
	name: `auth`,
	initialState,
	extraReducers(builder) {
		builder
			.addCase(fetchAuth.pending, (state, action) => {
				state.error = null;
				state.status = `loading`;
			})
			.addCase(fetchAuth.fulfilled, (state, action) => {
				state.status = `succeeded`;
				state.auth = action.payload.token;
			})
			.addCase(fetchAuth.rejected, (state, action) => {
				state.status = `failed`;
				state.error = action.error.message;
			})

			.addCase(fetchAuthLocal.fulfilled, (state, action) => {
				state.status = `succeeded`;
				state.auth = action.payload;
			})
			.addCase(fetchAuthLocal.rejected, (state, action) => {
				state.status = `idle`;
				state.error = null;
			});
	},
});

export const selectAuth = (state) => state.auth.auth;
export const getStatus = (state) => state.auth.status;
export const getError = (state) => state.auth.error;

export default authSlice.reducer;
