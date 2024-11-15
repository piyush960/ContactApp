import axios from "axios"

const env = import.meta.env.VITE_REACT_ENV

URL = "http://localhost:8080/api/contacts/"
if(env === 'production') URL = "https://cms-wr28.onrender.com/api/contacts/" ;

console.log(URL)

export const get_contacts = async () => {
	try {
		const data = await axios.get(URL)
		return data
	}
	catch (e) {
		console.log(e.response.data)
		return e.response
	}
}

export const create_contact = async (body) => {
	try {
		const data = await axios.post(URL, JSON.stringify(body), {
			headers: { 'Content-Type': 'application/json' }
		})
		return data
	}
	catch (e) {
		console.log(e.response)
		return e.response
	}
}

export const update_contact = async (id, body) => {
	try {
		const data = await axios.put(URL + id, JSON.stringify(body), {
			headers: { 'Content-Type': 'application/json' }
		})
		return data
	}
	catch (e) {
		console.log(e.response)
		return e.response
	}
}

export const delete_contact = async (id) => {
	try {
		const data = await axios.delete(URL + id)
		return data
	}
	catch (e) {
		console.log(e.response)
		return e.response
	}
}