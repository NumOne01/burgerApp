import React from "react"

import classes from "./Toolbar.module.css"
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import HumbergurButton from "../../UI/HumbergurButton/HumbergurButton"
import { Link } from "react-router-dom"

const Toolbar = props => {
	return (
		<header className={classes.Toolbar}>
			<div>
				<HumbergurButton clicked={props.showDrawer} />
			</div>
			<div className={classes.Logo}>
				<Link to="/">
					<Logo />
				</Link>
			</div>
			<nav>
				<NavigationItems isAuthenticated={props.isAuthenticated} />
			</nav>
		</header>
	)
}

export default Toolbar
