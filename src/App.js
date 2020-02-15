import React from "react"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Layout from "./containers/hoc/Layout/Layout"

const App = () => {
	return (
		<div>
			<Layout>
				<BurgerBuilder />
			</Layout>
		</div>
	)
}

export default App
