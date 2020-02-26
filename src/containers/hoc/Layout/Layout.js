import React, { Fragment, Component } from "react"
import Toolbar from "../../../components/Navigation/Toolbar/Toolbar"
import classes from "./Layout.module.css"
import Sidedrawer from "../../../components/Sidedrawer/Sidedrawer"
import { connect } from "react-redux"

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
				<Toolbar
					showDrawer={this.openSideDrawer}
					isAuthenticated={this.props.isAuthenticated}
				/>
				<Sidedrawer
					isAuthenticated={this.props.isAuthenticated}
					close={this.closeSideDrawer}
					open={this.state.showSidedrawer}
				/>
				<div className={classes.Layout}>{this.props.children}</div>
			</Fragment>
		)
	}
}

const mapStateToProps = ({ auth }) => {
	return {
		isAuthenticated: auth.token !== null
	}
}

export default connect(mapStateToProps)(Layout)
