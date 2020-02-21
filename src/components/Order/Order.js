import React from "react"
import classes from "./Order.module.css"

const Order = props => {
	const ingredients = []
	for (let key in props.ingredients)
		ingredients.push({ name: key, amout: props.ingredients[key] })
	const ingredientsOutput = ingredients.map(ingredient => (
		<span key={ingredient.name} className={classes.Ingredient}>
			{ingredient.name} {ingredient.amout}
		</span>
	))
	return (
		<div className={classes.Order}>
			<div>ingredient : {ingredientsOutput}</div>
			<p>total price : {props.price}</p>
		</div>
	)
}

export default Order
