import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
});

export default instance;
