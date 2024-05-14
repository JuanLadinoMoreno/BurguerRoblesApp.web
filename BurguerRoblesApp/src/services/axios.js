import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/session',
    withCredentials: true
})

export default instance
