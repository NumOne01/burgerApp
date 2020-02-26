import React from "react"
import classes from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem"

const NavigationItems = props => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem clicked={props.clicked} link="/" exact>
				Burger
			</NavigationItem>
			<NavigationItem clicked={props.clicked} link="/orders">
				Orders
			</NavigationItem>
			{props.isAuthenticated ? (
				<NavigationItem link="/logout" clicked={props.clicked}>
					Logout
				</NavigationItem>
			) : (
				<NavigationItem clicked={props.clicked} link="/auth">
					Authentication
				</NavigationItem>
			)}
		</ul>
	)
}

export default NavigationItems
