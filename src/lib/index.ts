import axios from "axios";
export const BASE_URL = "https://test-fe.mysellerpintar.com/api";

const useAxios = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default useAxios;
