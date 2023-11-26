import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./css/index.css";

import App from "./components/App";
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm";

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);