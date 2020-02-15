import React, { Fragment, Component } from "react"
import Toolbar from "../Navigation/Toolbar/Toolbar"
import classes from "./Layout.module.css"
import Sidedrawer from "../Sidedrawer/Sidedrawer"

class Layout extends Component {
	state = {
		showSidedrawer: false
	}

	closeSideDrawer = () => {
		this.setState({ showSidedrawer: false })
	}

	openSideDrawer = () => {
		this.setState({ showSidedrawer: true })
	}

	render() {
		return (
			<Fragment>
				<Toolbar showDrawer={this.openSideDrawer} />
				<Sidedrawer
					close={this.closeSideDrawer}
					open={this.state.showSidedrawer}
				/>
				<div className={classes.Layout}>{this.props.children}</div>
			</Fragment>
		)
	}
}

export default Layout
