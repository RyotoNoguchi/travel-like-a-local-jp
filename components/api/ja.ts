import axios from "axios"

const JP_API_BASE_URL = process.env.JP_API_BASE_URL ?? ""
axios.defaults.baseURL = JP_API_BASE_URL

export default axios
