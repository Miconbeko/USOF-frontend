import {useState} from "react";
import * as yup from "yup"
import {Field, Form, Formik} from "formik";
import ErrorMessage from "./ErrorMessage";
import SubmitButton from "./SubmitButton";
import {Link} from "react-router-dom";
import api from "../utils/api";

const loginSchema = yup.object({
    login: yup
        .string()
        .trim()
        .required(''),
    password: yup
        .string()
        .trim()
        .required('')
})

export default function LoginForm() {
    const [errMsg, setErrMsg] = useState(``)

    const handleLogin = async (values) => {
        try {
            const res = await api.post(api.routes.login, values)

            window.localStorage.setItem(`token`, res.data.token)
        } catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setErrMsg(err.response.data.message)
                // console.log(err.response.data);
                // console.log(err.response.status);
                // console.log(err.response.headers);
            } else if (err.request) {
                // The request was made but no response was received
                // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                setErrMsg(`Server didn't respond`)
                // console.log(err.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                setErrMsg(`Internal server error`)
                // console.log('Error', err.message);
            }
            // console.log(err.config);
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    login: ``,
                    password: ``
                }}
                validationSchema={loginSchema}
                onSubmit={handleLogin}
            >
                <Form>
                    <p>{errMsg}</p>

                    <label htmlFor="login">Login:</label>
                    <Field name="login" type="text"/>
                    <ErrorMessage name="login" marked={false}/>
                    <br/>

                    <label htmlFor="password">Password:</label>
                    <Field name="password" type="password" autoComplete="off"/>
                    <ErrorMessage name="password" marked={false}/>
                    <br/>

                    <SubmitButton value="Login"/>
                </Form>
            </Formik>
            <Link to={`/register`}>Get an account</Link>
        </>
    )
}