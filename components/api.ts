import axios from "axios"

const EN_API_BASE_URL = process.env.EN_API_BASE_URL ?? ""
axios.defaults.baseURL = EN_API_BASE_URL

export default axios
