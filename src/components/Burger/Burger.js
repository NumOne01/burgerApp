import React from "react"

import BurgerIngredient from "./BurgerIngredients/BurgerIngredient"
import classes from "./Burger.module.css"

const Burger = () => {
	return (
		<div className={classes.Burger}>
			{/* <BurgerIngredient type="bread-top" />
			<BurgerIngredient type="cheese" />
			<BurgerIngredient type="meat" />
			<BurgerIngredient type="bread-bottom" /> */}
		</div>
	)
}

export default Burger
