import {
	AUTH_FAIL,
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_LOGOUT,
	SET_AUTH_REDIRECT_PATH
} from "./actionTypes"
import axios from "axios"

export const logout = () => {
	localStorage.removeItem("token")
	localStorage.removeItem("expirationTime")
	localStorage.removeItem("userId")
	return {
		type: AUTH_LOGOUT
	}
}

const logoutTimeout = expirationTime => {
	return dispatch =>
		setTimeout(() => dispatch(logout()), expirationTime * 1000)
}

export const auth = (email, password, isSingnUp) => {
	return dispatch => {
		dispatch({ type: AUTH_START })
		const authData = {
			email,
			password,
			returnSecureToken: true
		}
		const url = isSingnUp
			? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAt2ZXDSrR54J3TCeO35Ah_Y3iiJL_vpW0"
			: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAt2ZXDSrR54J3TCeO35Ah_Y3iiJL_vpW0"
		axios
			.post(url, authData)
			.then(response => {
				localStorage.setItem("token", response.data.idToken)
				localStorage.setItem("userId", response.data.localId)
				localStorage.setItem(
					"expirationTime",
					new Date(
						new Date().getTime() + response.data.expiresIn * 1000
					)
				)
				dispatch({
					type: AUTH_SUCCESS,
					payload: {
						token: response.data.idToken,
						userId: response.data.localId
					}
				})
				dispatch(logoutTimeout(response.data.expiresIn))
			})
			.catch(error =>
				dispatch({
					type: AUTH_FAIL,
					payload: error.response.data.error
				})
			)
	}
}

export const setRedirectPath = path => {
	return {
		type: SET_AUTH_REDIRECT_PATH,
		payload: path
	}
}

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem("token")
		if (!token) dispatch(logout())
		else {
			const expirationTime = new Date(
				localStorage.getItem("expirationTime")
			)
			const userId = localStorage.getItem("userId")
			if (new Date().getTime() < expirationTime.getTime())
				dispatch({
					type: AUTH_SUCCESS,
					payload: {
						token,
						userId
					}
				})
		}
	}
}
