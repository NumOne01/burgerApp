import React, { Component } from 'react'
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import { purchaseBurger } from '../../../store/actions/index'
import { checkValidity } from '../../../shared/utility'

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'name'
				},
				value: '',
				valid: false,
				validation: {
					required: true
				},
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'email'
				},
				value: '',
				valid: false,
				validation: {
					required: true
				},
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				valid: false,
				validation: {
					required: true
				},
				touched: false
			},
			postal: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code'
				},
				value: '',
				valid: false,
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fast', name: 'Fast' },
						{ value: 'cheap', name: 'Cheap' }
					]
				},
				value: 'fastest',
				validation: {},
				valid: true
			}
		},
		loading: false,
		formIsValid: false
	}

	hadndleInputChange = (event, idetifire) => {
		const updatedForm = { ...this.state.orderForm }
		const updatedElement = { ...updatedForm[idetifire] }
		updatedElement.value = event.target.value
		updatedElement.valid = checkValidity(
			updatedElement.value,
			updatedElement.validation
		)
		updatedElement.touched = true
		updatedForm[idetifire] = updatedElement
		let formIsValid = true
		for (let key in updatedForm)
			formIsValid = updatedForm[key].valid && formIsValid
		this.setState({ orderForm: updatedForm, formIsValid })
	}

	onSubmit = () => {
		const { orderForm } = this.state
		const { ingredients, price, token, userId } = this.props
		this.setState({ loading: true })
		const orderData = {}
		for (let key in orderForm) orderData[key] = orderForm[key].value
		const order = {
			ingredients,
			price: price.toFixed(2),
			orderData,
			userId
		}
		this.props.onOrderBurger(order, token)
	}

	render() {
		const { orderForm, formIsValid } = this.state
		const inputElements = []
		for (let key in orderForm)
			inputElements.push({ id: key, config: orderForm[key] })
		const form = this.props.loading ? (
			<Spinner />
		) : (
			<form onSubmit={this.onSubmit}>
				{inputElements.map(inputElement => (
					<Input
						key={inputElement.id}
						elementType={inputElement.config.elementType}
						elementConfig={inputElement.config.elementConfig}
						value={inputElement.config.value}
						changed={event => {
							this.hadndleInputChange(event, inputElement.id)
						}}
						invalid={!inputElement.config.valid}
						shouldValidate={inputElement.config.validation}
						touched={inputElement.config.touched}
					/>
				))}
				<Button disabled={!formIsValid} type="Success">
					Order
				</Button>
			</form>
		)
		return <div className={classes.ContactData}>{form}</div>
	}
}

const mapStateToProps = state => {
	const { ingredients, totalPrice } = state.burger
	const { loading } = state.order
	const { token, userId } = state.auth
	return {
		ingredients,
		price: totalPrice,
		loading,
		token,
		userId
	}
}

export default connect(mapStateToProps, {
	onOrderBurger: purchaseBurger
})(withErrorHandler(ContactData, axios))
