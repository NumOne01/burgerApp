import React from "react"

import classes from "./BurgerControls.module.css"
import BurgerControl from "./BurgerControl/BurgerControl"

const btns = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Meat", type: "meat" },
	{ label: "Cheese", type: "cheese" }
]

const BurgerControls = props => {
	return (
		<div className={classes.BuildControls}>
			<p>
				<b>{props.price.toFixed(2)}</b>
			</p>
			{btns.map(btn => (
				<BurgerControl
					label={btn.label}
					key={btn.label}
					onMoreClicked={() => props.onMoreClicked(btn.type)}
					onLessClicked={() => props.onLessClicked(btn.type)}
					disabled={props.disabledInfo[btn.type]}
				/>
			))}
		</div>
	)
}

export default BurgerControls
