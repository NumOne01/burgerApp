import {
	PURCHASE_BURGER_FAILED,
	PURCHASE_BURGER_SUCCESS,
	PURCHASE_BURGER_START,
	PURCHASE_INIT,
	FETCH_ORDERS_FAILED,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_START
} from "../actions/actionTypes"

const initialState = {
	error: null,
	loading: false,
	orders: [],
	purchased: false
}

const order = (state = initialState, action) => {
	switch (action.type) {
		case PURCHASE_INIT:
			return { ...state, purchased: false }
		case PURCHASE_BURGER_START:
			return { ...state, loading: true }
		case PURCHASE_BURGER_FAILED:
			return { ...state, error: action.payload, loading: false }
		case PURCHASE_BURGER_SUCCESS:
			const newOrder = {
				...action.payload.order,
				id: action.payload.id
			}
			return {
				...state,
				orders: state.orders.concat(newOrder),
				loading: false,
				purchased: true
			}
		case FETCH_ORDERS_START:
			return { ...state, loading: true }
		case FETCH_ORDERS_FAILED:
			return { ...state, loading: false, error: action.payload }
		case FETCH_ORDERS_SUCCESS:
			return { ...state, loading: false, orders: action.payload }
		default:
			return state
	}
}

export default order
