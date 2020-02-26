import {
	AUTH_FAIL,
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_LOGOUT,
	SET_AUTH_REDIRECT_PATH
} from "../actions/actionTypes"

const initialState = {
	loading: false,
	token: null,
	userId: null,
	error: null,
	redirectPath: "/"
}

const auth = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_FAIL:
			return { ...state, error: action.payload, loading: false }
		case AUTH_SUCCESS:
			return {
				...state,
				error: null,
				loading: false,
				token: action.payload.token,
				userId: action.payload.userId
			}
		case AUTH_START:
			return { ...state, error: null, loading: true }
		case AUTH_LOGOUT:
			return { ...state, token: null, userId: null }
		case SET_AUTH_REDIRECT_PATH:
			return { ...state, redirectPath: action.payload }
		default:
			return state
	}
}

export default auth
