import axios from "axios";

const productsApi = axios.create({
  baseURL: import.meta.env.VITE_PRODUCTS_API,
});

export default productsApi;
