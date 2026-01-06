/**
 * defaultApiClient instance
 * API를 요청할 때 token을 통해 인증을 필요로하는 axios 인스턴스
 */
import axios from "axios";
import { keysToCamel, keysToSnake } from "../../utils/caseConverter";

const baseURL = import.meta.env.VITE_API_URL;

const defaultApiClient = axios.create({
  baseURL,
});

defaultApiClient.interceptors.request.use(
  (config) => {
    if (config.data) {
      config.data = keysToSnake(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

defaultApiClient.interceptors.response.use(
  (response) => {
    response.data = keysToCamel(response.data);
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default defaultApiClient;
