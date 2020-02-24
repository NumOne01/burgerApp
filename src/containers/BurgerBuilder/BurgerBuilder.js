import React, { Component, Fragment } from "react"
import Burger from "../../components/Burger/Burger"
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import { connect } from "react-redux"
import {
	addIngredient,
	removeIngredient,
	initBurger
} from "../../store/actions/index"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler"
import axios from "../../axios-order"

class BurgerBuilder extends Component {
	state = {
		purchasable: false,
		purchasing: false
	}

	componentDidMount() {
		this.props.onInit()
	}

	updatePurchasableState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(key => ingredients[key])
			.reduce((sum, el) => sum + el, 0)
		return sum > 0
	}

	purchasingHandler = () => {
		this.setState({ purchasing: true })
	}

	purchasingCanceled = () => {
		this.setState({ purchasing: false })
	}

	purchasingContinue = () => {
		const queryParams = []
		const { ingredients } = this.state
		for (let i in ingredients)
			queryParams.push(
				encodeURIComponent(i) + "=" + encodeURIComponent(ingredients[i])
			)
		queryParams.push("price=" + this.state.totalPrice)
		this.props.history.push({
			pathname: "/checkout",
			search: "?" + queryParams.join("&")
		})
	}

	render() {
		const disabledInfo = { ...this.props.ingredients }
		for (let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0
		return this.props.ingredients ? (
			<Fragment>
				<Modal
					show={this.state.purchasing}
					closeModal={this.purchasingCanceled}
				>
					<OrderSummary
						ingredients={this.props.ingredients}
						onClose={this.purchasingCanceled}
						onContinue={this.purchasingContinue}
						price={this.props.price}
					/>
				</Modal>
				<Burger ingredients={this.props.ingredients} />
				<BurgerControls
					price={this.props.price}
					disabledInfo={disabledInfo}
					onMoreClicked={this.props.onIngredientAdd}
					onLessClicked={this.props.onIngredientRemove}
					ordered={this.purchasingHandler}
					purchasable={this.updatePurchasableState(
						this.props.ingredients
					)}
				/>
			</Fragment>
		) : this.props.error ? (
			<h1>
				Something went wrong: <p>{this.props.error.message}</p>
			</h1>
		) : (
			<Spinner />
		)
	}
}

const mapStateToProps = state => {
	const { ingredients, totalPrice, error } = state
	return { ingredients, price: totalPrice, error }
}

export default connect(mapStateToProps, {
	onIngredientAdd: addIngredient,
	onIngredientRemove: removeIngredient,
	onInit: initBurger
})(withErrorHandler(BurgerBuilder, axios))
