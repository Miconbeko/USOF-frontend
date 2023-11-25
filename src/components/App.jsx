import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={`/login`} element={<LoginForm/>}/>
                <Route path={`/register`} element={<RegisterForm/>}/>
            </Routes>
        </BrowserRouter>
    )
}