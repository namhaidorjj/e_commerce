/** @format */

import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 8000,
});
// "https://e-commerce-e3ij.onrender.com"
