import React, { Fragment } from "react"

const OrderSummary = props => {
	const ingredientsSummary = Object.keys(props.ingredients).map(key => (
		<li key={key}>
			<span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
			{props.ingredients[key]}
		</li>
	))
	return (
		<Fragment>
			<p>Your OrderSummary :</p>
			<ul>{ingredientsSummary}</ul>
		</Fragment>
	)
}

export default OrderSummary
