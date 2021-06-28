import axios from "axios";
import config from "../config";

const api = axios.create({
  baseURL: config.api,
});

export default api;
