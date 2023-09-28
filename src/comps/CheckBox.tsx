import React, { useState } from "react";



export function CheckBox({startChecked, ...props}: {
	startChecked: boolean
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked" | "type">) {

	const [checked, setChecked] = useState(startChecked);

	return (
		<input 
			{...props}
			onChange={async e => {
				setChecked(!checked);
				props.onChange?.(e);
			}}
			type="checkbox"
			checked={checked}/>
	)
}

