import axios from "axios"

const api = axios.create({
    baseURL: "https://stemstarserver-production.up.railway.app/"
})

export default api
