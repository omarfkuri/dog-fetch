import React from "react";



export function Label({display, children, ...props}: {
	display: string
	children: any
} & React.LabelHTMLAttributes<HTMLLabelElement>) {

	return (
		<label>
			<h5>{display}</h5>
			{children}
		</label>
	)
}

