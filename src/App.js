import React, { Component, lazy, Suspense } from 'react'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Layout from './containers/hoc/Layout/Layout'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import { authCheckState } from './store/actions'
import Spinner from './components/UI/Spinner/Spinner'

const Checkout = lazy(() => import('./containers/Checkout/Checkout'))
const Orders = lazy(() => import('./containers/Orders/Orders'))
const Auth = lazy(() => import('./containers/Auth/Auth'))

class App extends Component {
	componentDidMount() {
		this.props.authCheckState()
	}
	render() {
		let routs = this.props.isAuthenticated ? (
			<Switch>
				<Route
					path="/checkout"
					render={props => (
						<Suspense fallback={<Spinner />}>
							<Checkout {...props} />
						</Suspense>
					)}
				/>
				<Route
					path="/orders"
					render={() => (
						<Suspense fallback={<Spinner />}>
							<Orders />
						</Suspense>
					)}
				/>
				<Route path="/logout" component={Logout} />
				<Route path="/" exact component={BurgerBuilder} />
				<Route
					path="/auth"
					render={() => (
						<Suspense fallback={<Spinner />}>
							<Auth />
						</Suspense>
					)}
				/>
				<Redirect to="/" />
			</Switch>
		) : (
			<Switch>
				<Route
					path="/auth"
					render={() => (
						<Suspense fallback={<Spinner />}>
							<Auth />
						</Suspense>
					)}
				/>
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		)
		return (
			<div>
				<BrowserRouter>
					<Layout>{routs}</Layout>
				</BrowserRouter>
			</div>
		)
	}
}

const mapStateToProps = ({ auth }) => {
	return {
		isAuthenticated: auth.token !== null
	}
}

export default connect(mapStateToProps, { authCheckState })(App)
