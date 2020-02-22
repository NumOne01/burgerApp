import React, { Component, Fragment } from "react"
import classes from "./ContactData.module.css"
import Button from "../../../components/UI/Button/Button"
import axios from "../../../axios-order"
import Spinner from "../../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import Input from "../../../components/UI/Input/Input"

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "name"
				},
				value: "shit"
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "email"
				},
				value: ""
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street"
				},
				value: ""
			},
			postal: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Zip Code"
				},
				value: ""
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fast", name: "Fast" },
						{ value: "cheap", name: "Cheap" }
					]
				},
				value: ""
			}
		},
		loading: false
	}

	hadndleInputChange = (event, idetifire) => {
		const updatedForm = { ...this.state.orderForm }
		const updatedElement = { ...updatedForm[idetifire] }
		updatedElement.value = event.target.value
		updatedForm[idetifire] = updatedElement
		this.setState({ orderForm: updatedForm })
	}

	onSubmit = () => {
		const { name, email, address } = this.state
		const { ingredients, price } = this.props
		this.setState({ loading: true })
		const order = {
			ingredients,
			price,
			name,
			email,
			address
		}
		axios
			.post("/orders.json", order)
			.then(() => {
				this.setState({ loading: false })
				this.props.history.push("/")
			})
			.catch(error => {
				this.setState({ loading: false })
				console.log(error)
			})
	}

	render() {
		const { orderForm, loading } = this.state
		const inputElements = []
		for (let key in orderForm)
			inputElements.push({ id: key, config: orderForm[key] })
		let form = loading ? (
			<Spinner />
		) : (
			<Fragment>
				<h1>Please fill the form</h1>
				{inputElements.map(inputElement => (
					<Input
						key={inputElement.id}
						elementType={inputElement.config.elementType}
						elementConfig={inputElement.config.elementConfig}
						value={inputElement.config.value}
						changed={event => {
							this.hadndleInputChange(event, inputElement.id)
						}}
					/>
				))}
				<Button type="Success" clicked={this.onSubmit}>
					Order
				</Button>
			</Fragment>
		)
		return <div className={classes.ContactData}>{form}</div>
	}
}

export default withErrorHandler(ContactData, axios)
