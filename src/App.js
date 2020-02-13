import React from "react"
import Layout from "./containers/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"

const App = () => {
	return (
		<div>
			<Layout>
				<p>Burger</p>
				<BurgerBuilder />
			</Layout>
		</div>
	)
}

export default App
