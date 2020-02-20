import React, { Component } from "react"
import classes from "./ContactData.module.css"
import Button from "../../../components/UI/Button/Button"

export default class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postal: ""
		}
	}

	onSubmit = () => {
		// const order = {
		//     ...this.props.ingreedi
		// }
		this.props.history.push("/")
	}

	render() {
		return (
			<div className={classes.ContactData}>
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
			</div>
		)
	}
}
