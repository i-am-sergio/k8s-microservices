import axios from "axios";

const api = axios.create({
  baseURL: "http://<BACKEND_HOST>:<PORT>/api",
});

export default api;
