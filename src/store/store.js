import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import postReducer from "./slices/postSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		post: postReducer,
		user: userReducer,
	},
});
