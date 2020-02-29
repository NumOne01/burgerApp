import React, { Fragment, Component } from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'
import { Transition } from 'react-transition-group'

class Modal extends Component {
	shouldComponentUpdate(nextProps) {
		return (
			this.props.show !== nextProps.show ||
			this.props.children !== nextProps.children
		)
	}
	render() {
		return (
			<Transition
				in={this.props.show}
				timeout={400}
				mountOnEnter
				unmountOnExit
			>
				{state => {
					const modalClasses = [classes.Modal]
					if (state === 'entered')
						modalClasses.push(classes.ModalOpen)
					if (state === 'exiting')
						modalClasses.push(classes.ModalClose)
					return (
						<Fragment>
							<Backdrop
								show={this.props.show}
								clicked={this.props.closeModal}
							/>
							<div className={modalClasses.join(' ')}>
								{this.props.children}
							</div>
						</Fragment>
					)
				}}
			</Transition>
		)
	}
}

export default Modal
