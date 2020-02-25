import React, { Component, Fragment } from "react"
import Button from "../../components/UI/Button/Button"
import Spinner from "../../components/UI/Spinner/Spinner"
import classes from "./Auth.module.css"
import Input from "../../components/UI/Input/Input"
import { auth } from "../../store/actions"
import { connect } from "react-redux"

class Auth extends Component {
	state = {
		controls: {
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Password"
				},
				value: "",
				valid: false,
				validation: {
					required: true,
					minLength: 6
				},
				touched: false
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Email"
				},
				value: "",
				valid: false,
				validation: {
					required: true
				},
				touched: false
			}
		},
		formIsValid: false,
		isSignUp: true
	}

	checkValidity(value, rules) {
		let isValid = true

		if (rules.required) isValid = value.trim() !== "" && isValid
		if (rules.minLength)
			isValid = value.trim().length >= rules.minLength && isValid
		if (rules.maxLength)
			isValid = value.trim().length <= rules.maxLength && isValid

		return isValid
	}

	switchAuthMod = event => {
		event.preventDefault()
		this.setState(prevState => ({ isSignUp: !prevState.isSignUp }))
	}

	hadndleInputChange = (event, identifire) => {
		const updatedForm = { ...this.state.controls }
		const updatedElement = { ...updatedForm[identifire] }
		updatedElement.value = event.target.value
		updatedElement.valid = this.checkValidity(
			updatedElement.value,
			updatedElement.validation
		)
		updatedElement.touched = true
		updatedForm[identifire] = updatedElement
		let formIsValid = true
		for (let key in updatedForm)
			formIsValid = updatedForm[key].valid && formIsValid
		this.setState({ controls: updatedForm, formIsValid })
	}

	onSubmitHandler = event => {
		event.preventDefault()
		const { email, password } = this.state.controls
		this.props.authenticate(
			email.value,
			password.value,
			this.state.isSignUp
		)
	}

	render() {
		const { controls } = this.state
		const { loading, error } = this.props
		const errorMessage = error ? <p>{error.message}</p> : null
		const inputElements = []
		for (let key in controls)
			inputElements.push({ id: key, config: controls[key] })
		const form = inputElements.map(inputElement => (
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
		))
		const loader = loading ? (
			<Spinner />
		) : (
			<Fragment>
				<Button type="Success" disabled={!this.state.formIsValid}>
					Submit
				</Button>
				<Button clicked={this.switchAuthMod} type="Danger">
					Change to {this.state.isSignUp ? "Sign in" : "SignUp"}
				</Button>
			</Fragment>
		)
		return (
			<div className={classes.Auth}>
				<form onSubmit={this.onSubmitHandler}>
					{form}
					{errorMessage}
					{loader}
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { loading, error } = state.auth
	return { loading, error }
}

export default connect(mapStateToProps, { authenticate: auth })(Auth)
