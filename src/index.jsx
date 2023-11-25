import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/style.css";

import App from "./components/App";
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm";

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <LoginForm />
    </StrictMode>
);