/**
 * authApiClient instance
 * API를 요청할 때 firebase 인증을 필요로 하는 axios 인스턴스
 */
import axios from "axios";
import { keysToCamel, keysToSnake } from "../../utils/caseConverter";
import { getAuth } from "firebase/auth";

const baseURL = import.meta.env.VITE_API_URL;
const authApiClient = axios.create({
  baseURL,
});

authApiClient.interceptors.request.use(
  async (config) => {
    const user = getAuth().currentUser;

    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error("Error getting ID token:", error);
        return Promise.reject(error);
      }
    } else {
      console.warn("No authenticated user found.");
      return Promise.reject("No authenticated user found.");
    }

    if (config.data) {
      config.data = keysToSnake(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authApiClient.interceptors.response.use(
  (response) => {
    response.data = keysToCamel(response.data);
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default authApiClient;
