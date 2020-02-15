import React, { Fragment, Component } from "react"
import classes from "./Modal.module.css"
import Backdrop from "../Backdrop/Backdrop"

class Modal extends Component {
	shouldComponentUpdate(nextProps) {
		return this.props.show !== nextProps.show
	}
	render() {
		return (
			<Fragment>
				<Backdrop
					show={this.props.show}
					clicked={this.props.closeModal}
				/>
				<div
					className={classes.Modal}
					style={{
						transform: this.props.show
							? "translateY(0)"
							: "translateY(-100vh)"
					}}
				>
					{this.props.children}
				</div>
			</Fragment>
		)
	}
}

export default Modal
