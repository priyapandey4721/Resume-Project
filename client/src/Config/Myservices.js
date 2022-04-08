import axios from "axios";
import { MAIN_URL } from "./Url";

export function registerUser(data) {
  return axios.post(`${MAIN_URL}cv/register`, data);
}
export function loginUser(data) {
  return axios.post(`${MAIN_URL}cv/login`, data);
}