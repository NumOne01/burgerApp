import React from "react"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Layout from "./containers/hoc/Layout/Layout"
import Checkout from "./containers/Checkout/Checkout"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Orders from "./containers/Orders/Orders"
import Auth from "./containers/Auth/Auth"
import Logout from "./containers/Auth/Logout/Logout"

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Layout>
					<Switch>
						<Route path="/checkout" component={Checkout} />
						<Route path="/orders" component={Orders} />
						<Route path="/auth" component={Auth} />
						<Route path="/logout" component={Logout} />
						<Route path="/" exact component={BurgerBuilder} />
					</Switch>
				</Layout>
			</BrowserRouter>
		</div>
	)
}

export default App
