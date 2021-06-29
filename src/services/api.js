import axios from "axios";
import config from "../config";

const api = axios.create({
  baseURL: config.api,
});

function mapResponseData(response) {
  if (response.data.error) {
    console.log(response.data.error);
    throw new Error(response.data.error);
  }
  return response.data.data;
}

function mapResponseError(error) {
  if (error.response.data && error.response.data.error) {
    throw new Error(error.response.data.error);
  } else {
    throw error;
  }
}

api.interceptors.response.use(mapResponseData, mapResponseError);

export default api;
