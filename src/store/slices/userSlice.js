import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialState = {
	user: {},
	status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
};

export const fetchUser = createAsyncThunk(`user/fetchUser`, async (params) => {
	try {
		const res = await api.get(api.routes.userByLogin(params.login));

		return res.data;
	} catch (err) {
		api.catcher(err, (msg) => {
			throw new Error(msg);
		});
	}
});

export const userSlice = createSlice({
	name: `user`,
	initialState,
	extraReducers(builder) {
		builder
			.addCase(fetchUser.pending, (state, action) => {
				state.status = `loading`;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.status = `succeeded`;

				action.payload.user.avatar =
					api.defaults.baseURL.slice(0, -3) +
					action.payload.user.avatar.slice(7);

				state.user = action.payload.user;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.status = `failed`;
				state.error = action.error.message;
			});
	},
});

export const selectUser = (state) => state.user.user;
export const getStatus = (state) => state.user.status;
export const getError = (state) => state.user.error;

export default userSlice.reducer;
