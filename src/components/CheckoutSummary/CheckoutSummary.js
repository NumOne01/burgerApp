import React from "react"
import classes from "./CheckoutSummary.module.css"
import Burger from "../Burger/Burger"
import Button from "../UI/Button/Button"

const CheckoutSummary = props => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope this is delicious</h1>
			<Burger ingredients={props.ingredients} />
			<Button type="Success">Continue</Button>
			<Button type="Danger" clicked={props.onCancel}>
				Cancel
			</Button>
		</div>
	)
}

export default CheckoutSummary
