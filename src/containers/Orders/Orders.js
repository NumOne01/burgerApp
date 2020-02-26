import React, { Component } from "react"
import Order from "../../components/Order/Order"
import axios from "../../axios-order"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler"
import { connect } from "react-redux"
import { fetchOrders } from "../../store/actions"

export class Orders extends Component {
	constructor(props) {
		super(props)
		this.props.fetchOrders(this.props.token)
	}

	render() {
		let form = this.props.loading ? (
			<div style={{ marginTop: "200px" }}>
				<Spinner />
			</div>
		) : (
			this.props.orders.map(order => (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					price={order.price}
				/>
			))
		)
		return <div>{form}</div>
	}
}

const mapStateToProps = store => {
	const { loading, orders, error } = store.order
	const { token } = store.auth
	return { loading, orders, error, token }
}

export default connect(mapStateToProps, { fetchOrders })(
	withErrorHandler(Orders, axios)
)
