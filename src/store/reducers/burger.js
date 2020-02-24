import * as actions from "../actions/actionTypes"

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		meat: 0,
		cheese: 0
	},
	totalPrice: 0
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
		default:
			return state
	}
}

export default burger
