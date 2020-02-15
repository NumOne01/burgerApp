import React, { Fragment } from "react"
import Toolbar from "../Navigation/Toolbar/Toolbar"
import classes from "./Layout.module.css"

const Layout = props => {
	return (
		<Fragment>
			<Toolbar />
			<div className={classes.Layout}>{props.children}</div>
		</Fragment>
	)
}

export default Layout
