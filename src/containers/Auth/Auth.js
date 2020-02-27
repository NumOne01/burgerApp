import React, { Component, Fragment } from 'react'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css'
import Input from '../../components/UI/Input/Input'
import { auth } from '../../store/actions'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setRedirectPath } from '../../store/actions'
import { checkValidity } from '../../shared/utility'

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email'
				},
				value: '',
				valid: false,
				validation: {
					required: true
				},
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				valid: false,
				validation: {
					required: true,
					minLength: 6
				},
				touched: false
			}
		},
		formIsValid: false,
		isSignUp: true
	}

	componentDidMount() {
		if (!this.props.isBuilding && this.props.redirectPath !== '/')
			this.props.setRedirectPath('/')
	}

	switchAuthMod = event => {
		event.preventDefault()
		this.setState(prevState => ({ isSignUp: !prevState.isSignUp }))
	}

	hadndleInputChange = (event, identifire) => {
		const updatedForm = { ...this.state.controls }
		const updatedElement = { ...updatedForm[identifire] }
		updatedElement.value = event.target.value
		updatedElement.valid = checkValidity(
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
				<div style={{ display: "block" }}>
					<Button type="Success" disabled={!this.state.formIsValid}>
						{!this.state.isSignUp ? 'Sign in' : 'SignUp'}
					</Button>
				</div>
				<Button clicked={this.switchAuthMod} type="Danger">
					{this.state.isSignUp
						? 'Already have an account ? Login'
						: 'Dont have an account ? SignUp'}
				</Button>
			</Fragment>
		)
		return (
			<div className={classes.Auth}>
				{this.props.isAuthenticated && (
					<Redirect to={this.props.redirectPath} />
				)}
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
	const { loading, error, token, redirectPath } = state.auth
	const { isBuilding } = state.burger
	return {
		loading,
		error,
		isAuthenticated: token !== null,
		isBuilding,
		redirectPath
	}
}

export default connect(mapStateToProps, {
	authenticate: auth,
	setRedirectPath
})(Auth)
