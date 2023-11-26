import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Header from "./Header";
import Footer from "./Footer";

export default function App() {
    return (
        <BrowserRouter>
            <div className="h-screen">
                <Header />
                <main>
                    <Routes>
                        <Route path={`/login`} element={<LoginForm/>}/>
                        <Route path={`/register`} element={<RegisterForm/>}/>
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}