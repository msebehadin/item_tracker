import axios from "axios";
const BASE_URL: string = "http://localhost:4000/api";
const token = localStorage.getItem('token');
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization:token?`Bearer ${token}`:''
  }
});

export default api;
