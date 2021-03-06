import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import { connect } from 'react-redux'
import {
	addIngredient,
	removeIngredient,
	initBurger,
	purchaseInit,
	setRedirectPath
} from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-order'

export class BurgerBuilder extends Component {
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
		if (this.props.isAuthenticated) this.setState({ purchasing: true })
		else {
			this.props.setRedirectPath('/checkout')
			this.props.history.push('/auth')
		}
	}

	purchasingCanceled = () => {
		this.setState({ purchasing: false })
	}

	purchasingContinue = () => {
		this.props.onPurchaseInit()
		this.props.history.push('/checkout')
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
					isAuthenticated={this.props.isAuthenticated}
				/>
			</Fragment>
		) : this.props.error ? (
			<h1 style={{ margin: '32px 32px' }}>
				Something went wrong: <p>{this.props.error.message}</p>
			</h1>
		) : (
			<div style={{ marginTop: '200px' }}>
				<Spinner />
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { ingredients, totalPrice, error } = state.burger
	const { token } = state.auth
	return {
		ingredients,
		price: totalPrice,
		error,
		isAuthenticated: token !== null
	}
}

export default connect(mapStateToProps, {
	onIngredientAdd: addIngredient,
	onIngredientRemove: removeIngredient,
	onInit: initBurger,
	onPurchaseInit: purchaseInit,
	setRedirectPath
})(withErrorHandler(BurgerBuilder, axios))
