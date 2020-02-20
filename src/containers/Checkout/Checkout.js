import React, { Component } from "react"
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary"

export default class Checkout extends Component {
	state = {
		ingredients: null
	}
	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search)
		const ingredients = {}
		for (let param of query.entries()) ingredients[param[0]] = +param[1]
		this.setState({ ingredients })
	}
	render() {
		return (
			<div>
				<CheckoutSummary
					onCancel={() => this.props.history.goBack()}
					ingredients={this.state.ingredients}
				/>
			</div>
		)
	}
}
