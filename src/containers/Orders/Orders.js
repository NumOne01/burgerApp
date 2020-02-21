import React, { Component } from "react"
import Order from "../../components/Order/Order"
import axios from "../../axios-order"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler"

export class Orders extends Component {
	state = {
		loading: true,
		orders: []
	}
	componentDidMount() {
		axios
			.get("/orders.json")
			.then(res => {
				const orders = []
				for (let key in res.data)
					orders.push({ ...res.data[key], id: key })
				this.setState({ loading: false, orders })
			})
			.catch(error => {
				console.error(error)
				this.setState({ loading: false })
			})
	}
	render() {
		let form = this.state.loading ? (
			<div style={{ marginTop: "200px" }}>
				<Spinner />
			</div>
		) : (
			this.state.orders.map(order => (
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

export default withErrorHandler(Orders, axios)
