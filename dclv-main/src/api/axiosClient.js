import axios from "axios";
import qs from "qs";
const dotenv = require("dotenv");
const path = require("path");
const envPath = path.resolve(__dirname, "../../../.env");
dotenv.config({ path: envPath });

const port = process.env.BACK_END_PORT;

const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: `http://localhost:${port || 5001}/api`,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => qs.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const customHeaders = { "x-access-token": null };
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    customHeaders["x-access-token"] = accessToken;
  }
  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  };
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
