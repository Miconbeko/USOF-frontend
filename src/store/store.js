import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import postReducer from "./slices/postSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		post: postReducer,
	},
});
