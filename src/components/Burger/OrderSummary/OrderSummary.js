import React, { Fragment } from "react"
import Button from "../../UI/Button/Button"

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
			<p>
				<b>Total Price : </b>
				{props.price.toFixed(2)} $
			</p>
			<Button type="Success" clicked={props.onContinue}>
				Continue
			</Button>
			<Button type="Danger" clicked={props.onClose}>
				Close
			</Button>
		</Fragment>
	)
}

export default OrderSummary
