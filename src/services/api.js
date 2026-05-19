import axios from "axios"

const api = axios.create({
    baseURL: "https://stemstarserver-9.onrender.com/"
})

export default api
