import axios from "axios";

export const makeApiCall = axios.create({
  baseURL: process.env.BASE_URL,
});
