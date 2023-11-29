import axios from "axios"

const API_URL = `http://localhost:14880/api`

const api = axios.create({
    baseURL: API_URL
})

api.routes = {
    register: `/auth/register`,
    login: `/auth/login`,
    allPosts: `/posts`
}

export default api