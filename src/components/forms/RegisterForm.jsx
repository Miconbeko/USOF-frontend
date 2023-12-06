import { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import ErrorMessage from "../ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubmitButton from "../buttons/SubmitButton";
import api from "../../utils/api";
import { Link } from "react-router-dom";

const registrationSchema = yup.object({
	login: yup
		.string()
		.trim()
		.matches(
			/^[\d\w]{5,40}$/,
			`5 to 40 characters. Letters and numbers allowed`,
		),
	email: yup.string().trim().email(`Must be an email`),
	password: yup
		.string()
		.trim()
		.min(5, `5 to 255 characters`)
		.max(255, `5 to 255 characters`),
	repeatPassword: yup
		.string()
		.trim()
		.oneOf([yup.ref("password")], `Passwords must match`),
});

export default function RegisterForm() {
	const [errMsg, setErrMsg] = useState(``);
	const [success, setSuccess] = useState(false);
	const inputRef = useRef(null);

	const handleRegister = async (values) => {
		try {
			const res = await api.post(api.routes.register, {
				...values,
				redirectUrl: `http://localhost:3000/verifyEmail/:token`,
			});

			setSuccess(true);
		} catch (err) {
			api.catcher(err, setErrMsg);
		}
	};

	const successMessage = (
		<div>
			<p>
				Congratulations ! You account is registered. We sent you a
				confirmation link. Click on it and login in your brand new
				accout
			</p>
		</div>
	);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [inputRef]);

	const form = (
		<div>
			<Formik
				initialValues={{
					login: ``,
					email: ``,
					password: ``,
					repeatPassword: ``,
				}}
				validationSchema={registrationSchema}
				onSubmit={handleRegister}
			>
				<Form>
					<p>{errMsg}</p>

					<label htmlFor="login">Login:</label>
					<Field
						name="login"
						type="text"
						autoComplete="off"
						innerRef={inputRef}
					/>
					<ErrorMessage name="login" />
					<br />

					<label htmlFor="email">Email:</label>
					<Field name="email" type="text" />
					<ErrorMessage name="email" />
					<br />

					<label htmlFor="password">Password:</label>
					<Field name="password" type="password" autoComplete="off" />
					<ErrorMessage name="password" />
					<br />

					<label htmlFor="repeatPassword">Password:</label>
					<Field
						name="repeatPassword"
						type="password"
						autoComplete="off"
					/>
					<ErrorMessage name="repeatPassword" />
					<br />

					<SubmitButton value="Register" />
				</Form>
			</Formik>
			<Link to={`/login`}>Already have an account</Link>
		</div>
	);

	return <>{success ? successMessage : form}</>;
}
