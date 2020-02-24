import * as actions from "../actions/actionTypes"

const initialState = {
	ingredients: null,
	totalPrice: 4.0,
	error: null
}

const prices = {
	salad: 0.5,
	meat: 1.3,
	bacon: 0.7,
	cheese: 0.6
}

const burger = (state = initialState, action) => {
	switch (action.type) {
		case actions.ADD_INGREDIENT:
			return {
				totalPrice: state.totalPrice + prices[action.payload],
				ingredients: {
					...state.ingredients,
					[action.payload]: state.ingredients[action.payload] + 1
				}
			}
		case actions.REMOVE_INGREDIENT:
			return {
				totalPrice: state.totalPrice - prices[action.payload],
				ingredients: {
					...state.ingredients,
					[action.payload]: state.ingredients[action.payload] - 1
				}
			}
		case actions.SET_INGREDIENTS:
			return {
				...state,
				ingredients: action.payload,
				totalPrice: 4.0
			}
		case actions.FETCHING_FAILED:
			return {
				...state,
				error: action.payload
			}
		default:
			return state
	}
}

export default burger
