import reducer from './auth'
import { AUTH_SUCCESS } from '../actions/actionTypes'

describe('auth reducer', () => {
	let initialState

	beforeEach(
		() =>
			(initialState = {
				loading: false,
				token: null,
				userId: null,
				error: null,
				redirectPath: '/'
			})
	)

	it('should store token in state', () => {
		expect(
			reducer(initialState, {
				type: AUTH_SUCCESS,
				payload: {
					token: 'some-token',
					userId: 'some-user-id'
				}
			})
		).toEqual({
			loading: false,
			token: 'some-token',
			userId: 'some-user-id',
			error: null,
			redirectPath: '/'
		})
	})

	it('should return initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})
})
