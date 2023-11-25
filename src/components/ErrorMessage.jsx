import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useFormikContext } from "formik";

export default function ErrorMessage({ name, marked = true }) {
    const formik = useFormikContext()

    let mark = null

    if (formik.errors[name])
        mark = <FontAwesomeIcon icon={faXmark} />
    else if (formik.values[name])
        mark = <FontAwesomeIcon icon={faCheck} />

    return (
        <>
            { marked ? mark : null }
            { formik.errors[name] ? <div>{formik.errors[name]}</div> : null }
        </>
    )
}