import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "./actionTypes"

export const addIngredient = type => {
	return {
		type: ADD_INGREDIENT,
		payload: type
	}
}

export const removeIngredient = type => {
	return {
		type: REMOVE_INGREDIENT,
		payload: type
	}
}
