import { useEffect, useState } from "react";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../store/slices/authSlice";

export default function VerifyDeletionPage() {
	const dispatch = useDispatch();
	const [errMsg, setErrMsg] = useState(``);

	useEffect(() => {
		const verify = async () => {
			const token = window.location.pathname.split(`/`)[2];

			try {
				await dispatch(deleteAccount({ token })).unwrap();
			} catch (err) {
				setErrMsg(err.message);
			}
		};

		verify();

		// try {
		//     const res = await api.patch(api.routes.verifyEmail(token));
		// } catch (err) {
		//     // setErrMsg(err.message);
		//     api.catcher(err, (msg) => setErrMsg(msg));
		// }
	}, []);

	return (
		<>{errMsg ? errMsg : <div>Your account successfully deleted</div>}</>
	);
}
