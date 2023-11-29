import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import postsReduced from "./slices/postsSlice";

export const store = configureStore({
	reducer: {
		posts: postsReduced,
		counter: counterReducer,
	},
});
