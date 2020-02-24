import React, { Component } from "react"
import { connect } from "react-redux"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import { Route, Redirect } from "react-router-dom"
import ContactData from "./ContactData/ContactData"
import { purchaseInit } from "../../store/actions"

class Checkout extends Component {
	onContinue = () => {
		this.props.history.replace(this.props.match.url + "/contact-data")
	}

	render() {
		const summary =
			this.props.ingredients && !this.props.purchased ? (
				<div>
					<CheckoutSummary
						onCancel={() => this.props.history.goBack()}
						onContinue={this.onContinue}
						ingredients={this.props.ingredients}
					/>
					<Route
						component={ContactData}
						path={this.props.match.url + "/contact-data"}
					/>
				</div>
			) : (
				<Redirect to="/" />
			)
		return summary
	}
}

const mapStateToProps = state => {
	const { ingredients } = state.burger
	const { purchased } = state.order
	return {
		ingredients,
		purchased
	}
}

export default connect(mapStateToProps)(Checkout)
