import { useState } from "react";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import ErrorMessage from "./ErrorMessage";
import SubmitButton from "./SubmitButton";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, setCount } from "../store/slices/counterSlice";

const loginSchema = yup.object({
	login: yup.string().trim().required(""),
	password: yup.string().trim().required(""),
});

export default function LoginForm() {
	const [errMsg, setErrMsg] = useState(``);
	const count = useSelector((state) => state.counter.count);
	const dispatch = useDispatch();

	const handleLogin = async (values) => {
		try {
			const res = await api.post(api.routes.login, values);

			window.localStorage.setItem(`token`, res.data.token);
		} catch (err) {
			api.catcher(err, setErrMsg);
		}
	};

	return (
		<>
			<section>
				<h2>{count}</h2>
				<button onClick={() => dispatch(increment())}>+</button>
				<button onClick={() => dispatch(decrement())}>-</button>
				<button onClick={() => dispatch(setCount(5))}>=5</button>
			</section>
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
					<Field name="login" type="text" />
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
}
