import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	FETCHING_FAILED,
	SET_INGREDIENTS
} from "./actionTypes"
import axios from "../../axios-order"

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

export const initBurger = () => {
	return dispatch =>
		axios
			.get("/ingredients.json")
			.then(response =>
				dispatch({ type: SET_INGREDIENTS, payload: response.data })
			)
			.catch(error => dispatch({ type: FETCHING_FAILED, payload: error }))
}
