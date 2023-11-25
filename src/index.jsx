import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/style.css";

import App from "./components/App";
import RegisterForm from "./components/RegisterForm"

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <RegisterForm />
    </StrictMode>
);