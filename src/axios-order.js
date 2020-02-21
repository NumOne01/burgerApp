import axios from "axios"

const instance = axios.create({
	baseURL: "https://burgerapp-e1c98.firebaseio.com/"
})

export default instance
