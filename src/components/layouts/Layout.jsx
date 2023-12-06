import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div className="flex flex-col">
			<Header />
			<main
				className={
					"flex-grow min-w-4xl w-1/3 min-h-screen mt-10 pt-16 p-16 m-auto border-2 border-teal-600"
				}
			>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
