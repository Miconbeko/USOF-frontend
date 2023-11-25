import React from "react";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import ErrorMessage from "./ErrorMessage"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SubmitButton from "./SubmitButton";

const validationSchema = yup.object({
    login: yup
        .string()
        .trim()
        .matches(/^[\d\w]{5,40}$/, `5 to 40 characters. Letters and numbers allowed`),
    email: yup
        .string()
        .trim()
        .email(`Must be an email`),
    password: yup
        .string()
        .trim()
        .min(5, `5 to 255 characters`)
        .max(255, `5 to 255 characters`),
    repeatPassword: yup
        .string()
        .trim()
        .oneOf([yup.ref('password')], `Passwords must match`)
})

export default function RegisterForm() {
    return (
        <Formik
            initialValues={{
                login: ``,
                email: ``,
                password: ``,
                repeatPassword: ``
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
            alert(JSON.stringify(values, null, 2))}}
        >
            <Form>
                <label htmlFor="login">Login:</label>
                <Field name="login" type="text" autoComplete="off"/>
                <ErrorMessage name="login"/>
                <br/>

                <label htmlFor="email">Email:</label>
                <Field name="email" type="text"/>
                <ErrorMessage name="email"/>
                <br/>

                <label htmlFor="password">Password:</label>
                <Field name="password" type="password" autoComplete="off"/>
                <ErrorMessage name="password"/>
                <br/>

                <label htmlFor="repeatPassword">Password:</label>
                <Field name="repeatPassword" type="password" autoComplete="off"/>
                <ErrorMessage name="repeatPassword"/>
                <br/>

                <SubmitButton value="Register"/>
            </Form>
        </Formik>
    )
}