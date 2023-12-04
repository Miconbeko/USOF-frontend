import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store/store";
import { Provider } from "react-redux";

import "./css/index.css";

import App from "./components/App";
import RegisterForm from "./components/forms/RegisterForm";
import LoginForm from "./components/forms/LoginForm";

const root = createRoot(document.getElementById("root"));
root.render(
	// <StrictMode>
	<Provider store={store}>
		<App />
	</Provider>,
	// </StrictMode>,
);
