import React from "react";
import * as yup from "yup"
import {Field, Form, Formik} from "formik";
import ErrorMessage from "./ErrorMessage";
import SubmitButton from "./SubmitButton";

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
    return (
        <Formik
            initialValues={{
                login: ``,
                password: ``
            }}
            validationSchema={loginSchema}
            onSubmit={values => {
                alert(JSON.stringify(values, null, 2))}}
        >
            <Form>
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
    )
}