import React from 'react'

import BurgerIngredient from './BurgerIngredients/BurgerIngredient'
import classes from './Burger.module.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Burger = props => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map(igKey =>
			[...Array(props.ingredients[igKey])].map((_, i) => {
				return (
					<CSSTransition
						key={igKey + i}
						timeout={{ enter: 300, exit: 200 }}
						classNames={{
							enter: classes['fade-enter'],
							enterActive: classes['fade-enter-active'],
							exit: classes['fade-exit'],
							exitActive: classes['fade-exit-active']
						}}
					>
						<BurgerIngredient type={igKey} />
					</CSSTransition>
				)
			})
		)
		.reduce((arr, el) => arr.concat(el), [])
	transformedIngredients =
		transformedIngredients.length === 0 ||
		!transformedIngredients.length ? (
			<p>Please add some ingredients !</p>
		) : (
			<TransitionGroup component={null}>
				{transformedIngredients}
			</TransitionGroup>
		)

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	)
}

export default Burger
