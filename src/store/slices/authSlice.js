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

export const fetchAuthLocal = createAsyncThunk(
	`auth/localLogin`,
	async (params, { dispatch }) => {
		const token = window.localStorage.getItem(`token`);

		if (token) return token;

		throw new Error(`Not login`);
	},
);

export const getUserCheckToken = createAsyncThunk(
	`auth/getUserCheckToken`,
	async () => {
		try {
			const res = await api.get(api.routes.userByToken);

			return res.data;
		} catch (err) {
			api.catcher(err, api.errorHandlers.rethrow);
		}
	},
);

export const logout = createAsyncThunk(`auth/logout`, async () => {
	try {
		const res = api.delete(api.routes.logout);

		return res.data;
	} catch (err) {
		api.catcher(err, api.errorHandlers.rethrow);
	}
});

export const fullLogout = createAsyncThunk(`auth/fullLogout`, async () => {
	try {
		const res = api.delete(api.routes.fullLogout);

		return res.data;
	} catch (err) {
		api.catcher(err, api.errorHandlers.rethrow);
	}
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
				state.auth = action.payload;
				window.localStorage.setItem(`token`, action.payload.token);
			})
			.addCase(fetchAuth.rejected, (state, action) => {
				state.status = `failed`;
				state.error = action.error.message;
				window.localStorage.removeItem(`token`);
			})

			.addCase(fetchAuthLocal.fulfilled, (state, action) => {
				state.status = `succeeded`;
				state.auth.token = action.payload;
			})
			.addCase(fetchAuthLocal.rejected, (state, action) => {
				state.status = `idle`;
				state.error = null;
			})

			.addCase(getUserCheckToken.pending, (state, action) => {
				state.error = null;
				state.status = `loading`;
			})
			.addCase(getUserCheckToken.fulfilled, (state, action) => {
				state.status = `succeeded`;
				state.auth.user = action.payload.user;
			})
			.addCase(getUserCheckToken.rejected, (state, action) => {
				state.status = `idle`;
				state.error = null;
				state.auth = {};
				window.localStorage.removeItem(`token`);
			})

			.addCase(logout.pending, (state, action) => {
				state.error = null;
				state.status = `loading`;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.status = `idle`;
				state.auth = {};
				window.localStorage.removeItem(`token`);
			})
			.addCase(logout.rejected, (state, action) => {
				state.status = `idle`;
				state.auth = {};
				window.localStorage.removeItem(`token`);
			})

			.addCase(fullLogout.pending, (state, action) => {
				state.error = null;
				state.status = `loading`;
			})
			.addCase(fullLogout.fulfilled, (state, action) => {
				state.status = `idle`;
				state.auth = {};
				window.localStorage.removeItem(`token`);
			})
			.addCase(fullLogout.rejected, (state, action) => {
				state.status = `idle`;
				state.auth = {};
				window.localStorage.removeItem(`token`);
			});
	},
});

export const selectAuth = (state) => state.auth.auth;
export const getStatus = (state) => state.auth.status;
export const getError = (state) => state.auth.error;

export default authSlice.reducer;
