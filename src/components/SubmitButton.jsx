import {useFormikContext} from "formik";

function allFilled(obj) {
    for (const key in obj) {
        if (!obj[key])
            return false
    }

    return true
}

export default function SubmitButton({ value="Submit" }) {
    const formik = useFormikContext()

    return (
        <button type="submit" disabled={!formik.isValid || formik.isSubmitting || !allFilled(formik.values)}>{value}</button>
    )
}