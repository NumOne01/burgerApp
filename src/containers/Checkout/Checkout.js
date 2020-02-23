import React, { Component } from "react"
import { connect } from "react-redux"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import { Route } from "react-router-dom"
import ContactData from "./ContactData/ContactData"

class Checkout extends Component {
	onContinue = () => {
		this.props.history.replace(this.props.match.url + "/contact-data")
	}

	render() {
		return (
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
		)
	}
}

const mapStateToProps = state => {
	const { ingredients } = state
	return {
		ingredients
	}
}

export default connect(mapStateToProps)(Checkout)
