import React from "react";



export function Label({display, children, reverse = false, ...props}: {
	display: string
	reverse?: boolean
	children: any
} & React.LabelHTMLAttributes<HTMLLabelElement>) {

	return (
		<label className="label-wrapper" {...props}>
			{reverse && <div className="label-children">{children}</div>}
			<div className="label-title">{display}</div>
			{!reverse && <div className="label-children">{children}</div>}
		</label>
	)
}

