import React from "react"
import classes from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem"

const NavigationItems = () => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/" active>Burger</NavigationItem>
			<NavigationItem link="/">Purchase</NavigationItem>
		</ul>
	)
}

export default NavigationItems
