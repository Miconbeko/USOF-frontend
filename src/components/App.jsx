import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Main from "../pages/Main";
import Layout from "./Layout";
import Missing from "../pages/Missing";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>

                    <Route path="*" element={<Missing/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}