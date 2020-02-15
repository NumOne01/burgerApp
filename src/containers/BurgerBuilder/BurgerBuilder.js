import React, { Component, Fragment } from "react"
import Burger from "../../components/Burger/Burger"
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls"

const prices = {
	salad: 0.5,
	meat: 1.3,
	bacon: 0.7,
	cheese: 0.6
}

export default class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			meat: 0,
			cheese: 0,
			bacon: 0
		},
		totalPrice: 2.0
	}

	onMoreClicked = type => {
		const ingredients = { ...this.state.ingredients }
		ingredients[type] += 1
		let totalPrice = this.state.totalPrice
		totalPrice += prices[type]
		this.setState({ ingredients, totalPrice })
	}

	onLessClicked = type => {
		const ingredients = { ...this.state.ingredients }
		if (ingredients[type] <= 0) return
		let totalPrice = this.state.totalPrice
		totalPrice -= prices[type]
		ingredients[type] -= 1
		this.setState({ ingredients, totalPrice })
	}

	render() {
		const disabledInfo = { ...this.state.ingredients }
		for (let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0
		return (
			<Fragment>
				<Burger ingredients={this.state.ingredients} />
				<BurgerControls
					price={this.state.totalPrice}
					disabledInfo={disabledInfo}
					onMoreClicked={this.onMoreClicked}
					onLessClicked={this.onLessClicked}
				/>
			</Fragment>
		)
	}
}
