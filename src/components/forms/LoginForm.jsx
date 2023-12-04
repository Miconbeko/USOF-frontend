import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import ErrorMessage from "../ErrorMessage";
import SubmitButton from "../buttons/SubmitButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchAuth,
	getError,
	getStatus,
	selectAuth,
} from "../../store/slices/authSlice";
import Loading from "../Loading";

const loginSchema = yup.object({
	login: yup.string().trim().required(""),
	password: yup.string().trim().required(""),
});

export default function LoginForm() {
	const auth = useSelector(selectAuth);
	const authStatus = useSelector(getStatus);
	const authError = useSelector(getError);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const [errMsg, setErrMsg] = useState(``);
	const inputRef = useRef(null);

	const handleLogin = async (values) => {
		try {
			if (authStatus !== `succeeded`) {
				await dispatch(fetchAuth(values)).unwrap();
				navigate(from, { replace: true });
				// setErrMsg(null)
			}
		} catch (err) {
			setErrMsg(err.message);
		}
	};

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [inputRef]);

	const alreadyLoggedIn = <div>You're already logged in</div>;

	const form = (
		<>
			<Formik
				initialValues={{
					login: ``,
					password: ``,
				}}
				validationSchema={loginSchema}
				onSubmit={handleLogin}
			>
				<Form>
					<p>{errMsg}</p>

					<label htmlFor="login">Login:</label>
					<Field name="login" type="text" innerRef={inputRef} />
					<ErrorMessage name="login" marked={false} />
					<br />

					<label htmlFor="password">Password:</label>
					<Field name="password" type="password" autoComplete="off" />
					<ErrorMessage name="password" marked={false} />
					<br />

					<SubmitButton value="Login" />
				</Form>
			</Formik>
			<Link to={`/register`}>Get an account</Link>
		</>
	);

	return (
		<>
			{(() => {
				if (authStatus === `loading`) return <Loading />;
				if (authStatus === `succeeded`) return alreadyLoggedIn;
				return form;
			})()}
		</>
	);
}
