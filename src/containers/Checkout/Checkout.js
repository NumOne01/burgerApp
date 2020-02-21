import React, { Component } from "react"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import { Route } from "react-router-dom"
import ContactData from "./ContactData/ContactData"

export default class Checkout extends Component {
	state = {
		ingredients: {
			meat: 1,
			salad: 1,
			bacon: 1,
			cheese: 1
		},
		price: 0
	}

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search)
		const ingredients = {}
		let price = 0
		for (let param of query.entries()) {
			if (param[0] === "price") price = param[1]
			else ingredients[param[0]] = +param[1]
		}
		this.setState({ ingredients, price })
	}

	onContinue = () => {
		this.props.history.replace(this.props.match.url + "/contact-data")
	}

	render() {
		return (
			<div>
				<CheckoutSummary
					onCancel={() => this.props.history.goBack()}
					onContinue={this.onContinue}
					ingredients={this.state.ingredients}
				/>
				<Route
					component={props => (
						<ContactData
							ingredients={this.state.ingredients}
							price={this.state.price}
							{...props}
						/>
					)}
					path={this.props.match.url + "/contact-data"}
				/>
			</div>
		)
	}
}
