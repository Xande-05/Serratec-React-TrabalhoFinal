import axios from "axios";
const MOCKAPI_BASE_URL = "https://69122ee252a60f10c820ea9a.mockapi.io";

const mockApi = axios.create({
  baseURL: MOCKAPI_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default mockApi;
