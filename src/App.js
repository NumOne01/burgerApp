import React, { Component } from "react"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Layout from "./containers/hoc/Layout/Layout"
import Checkout from "./containers/Checkout/Checkout"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Orders from "./containers/Orders/Orders"
import Auth from "./containers/Auth/Auth"
import Logout from "./containers/Auth/Logout/Logout"
import { connect } from "react-redux"
import { authCheckState } from "./store/actions"

class App extends Component {
	componentDidMount() {
		this.props.authCheckState()
	}
	render() {
		console.log(this.props.isAuthenticated)
		let routs = this.props.isAuthenticated ? (
			<Switch>
				<Route path="/checkout" component={Checkout} />
				<Route path="/orders" component={Orders} />
				<Route path="/logout" component={Logout} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		) : (
			<Switch>
				<Route path="/auth" component={Auth} />
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
