import { useField, useFormikContext } from "formik";
import { useState } from "react";
import ToggleButton from "./buttons/ToggleButton";

export default function Dropdown({ options, name }) {
	const [field, meta, helpers] = useField(name);

	const [show, setShow] = useState(false);

	const handleChange = (value) => {
		helpers.setValue(value);
		handleShow();
	};

	const handleShow = () => {
		setShow(!show);
	};

	const list = (
		<div>
			{options.map((opt, index) => (
				<button
					type="button"
					key={index}
					onClick={() => {
						handleChange(opt);
					}}
				>
					{opt}
				</button>
			))}
		</div>
	);

	return (
		<>
			<button type="button" onClick={handleShow}>
				{field.value}
			</button>
			{show ? list : null}
		</>
	);
}
