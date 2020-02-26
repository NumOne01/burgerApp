import {
	PURCHASE_BURGER_FAILED,
	PURCHASE_BURGER_SUCCESS,
	PURCHASE_BURGER_START,
	PURCHASE_INIT,
	FETCH_ORDERS_FAILED,
	FETCH_ORDERS_START,
	FETCH_ORDERS_SUCCESS
} from './actionTypes'
import axios from '../../axios-order'

const purchaseBurgerSuccess = (order, id) => {
	return {
		type: PURCHASE_BURGER_SUCCESS,
		payload: { order, id }
	}
}

const purchaseBurgerFailed = error => {
	return {
		type: PURCHASE_BURGER_FAILED,
		payload: error
	}
}

export const purchaseBurger = (order, token) => {
	return dispatch => {
		dispatch({ type: PURCHASE_BURGER_START })
		axios
			.post('/orders.json?auth=' + token, order)
			.then(response => {
				dispatch(purchaseBurgerSuccess(order, response.data.name))
			})
			.catch(error => {
				dispatch(purchaseBurgerFailed(error))
			})
	}
}

export const purchaseInit = () => {
	return {
		type: PURCHASE_INIT
	}
}

export const fetchOrders = (token, userId) => {
	return dispatch => {
		dispatch({ type: FETCH_ORDERS_START })
		const queryParams =
			'?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
		axios
			.get('/orders.json' + queryParams)
			.then(response => {
				const orders = []
				for (let key in response.data)
					orders.push({ ...response.data[key], id: key })
				dispatch({ type: FETCH_ORDERS_SUCCESS, payload: orders })
			})
			.catch(error =>
				dispatch({ type: FETCH_ORDERS_FAILED, payload: error })
			)
	}
}
