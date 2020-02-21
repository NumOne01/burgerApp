import React, { Component, Fragment } from "react"
import Modal from "../../../components/UI/Modal/Modal"

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		}

		componentDidMount() {
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({ error: null })
				return req
			})
			this.resInterceptor = axios.interceptors.response.use(
				req => req,
				error => {
					this.setState({ error })
					return Promise.reject(error)
				}
			)
		}

		componentWillUnmount() {
			axios.interceptors.response.eject(this.reqInterceptor)
			axios.interceptors.request.eject(this.reqInterceptor)
		}

		errorConfirmed = () => {
			this.setState({ error: null })
		}

		render() {
			const { error } = this.state
			return (
				<Fragment>
					<Modal show={error} closeModal={this.errorConfirmed}>
						{error ? error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Fragment>
			)
		}
	}
}

export default withErrorHandler
