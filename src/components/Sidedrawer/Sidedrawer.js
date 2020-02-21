import React, { Fragment } from "react"
import Logo from "../Logo/Logo"
import NavigationItems from "../Navigation/NavigationItems/NavigationItems"
import Backdrop from "../UI/Backdrop/Backdrop"
import classes from "./Sidedrawer.module.css"

const Sidedrawer = props => {
	return (
		<Fragment>
			<Backdrop show={props.open} clicked={props.close} />
			<div
				className={classes.Sidedrawer}
				style={
					props.open
						? {
								transform: "translateX(0)",
								display: "block"
						  }
						: { transform: "translateX(-100vw)", display: "none" }
				}
			>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Fragment>
	)
}

export default Sidedrawer
