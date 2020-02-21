import React, { Component, Fragment } from "react"
import classes from "./ContactData.module.css"
import Button from "../../../components/UI/Button/Button"
import axios from "../../../axios-order"
import Spinner from "../../../components/UI/Spinner/Spinner"

export default class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postal: ""
		},
		loading: false
	}

	onSubmit = () => {
		this.setState({ loading: true })
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price
		}
		axios
			.post("/orders.json", order)
			.then(() => this.setState({ loading: false }))
			.catch(error => {
				console.error(error)
				this.setState({ loading: false })
			})
		this.props.history.push("/")
	}

	render() {
		let form = this.state.loading ? (
			<Spinner />
		) : (
			<Fragment>
				<h1>Please fill the form</h1>
				<input type="text" placeholder="Name" name="name" />
				<input type="email" placeholder="Your Email" name="email" />
				<input
					type="text"
					placeholder="Postal Code"
					name="postalcode"
				/>
				<input type="text" placeholder="Street" name="street" />
				<Button type="Success" clicked={this.onSubmit}>
					Order
				</Button>
			</Fragment>
		)
		return <div className={classes.ContactData}>{form}</div>
	}
}
