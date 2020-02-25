import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { createStore, compose, applyMiddleware, combineReducers } from "redux"
import { Provider } from "react-redux"
import * as serviceWorker from "./serviceWorker"
import burgerReducer from "./store/reducers/burger"
import ordersReducer from "./store/reducers/order"
import authReducer from "./store/reducers/auth"
import thunk from "redux-thunk"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
	burger: burgerReducer,
	order: ordersReducer,
	auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
