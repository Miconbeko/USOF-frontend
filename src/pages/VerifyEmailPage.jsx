import { useEffect, useState } from "react";
import api from "../utils/api";

export default function VerifyEmailPage() {
	const [errMsg, setErrMsg] = useState(``);

	useEffect(() => {
		const verify = async () => {
			const token = window.location.pathname.split(`/`)[2];

			try {
				const res = await api.patch(api.routes.verifyEmail(token));
			} catch (err) {
				// setErrMsg(err.message);
				api.catcher(err, (msg) => setErrMsg(msg));
			}
		};

		verify();
	}, []);

	return (
		<>{errMsg ? errMsg : <div>Your account successfully confirmed!</div>}</>
	);
}
