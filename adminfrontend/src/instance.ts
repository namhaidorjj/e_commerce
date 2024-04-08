/** @format */

import axios from "axios";

export const instance = axios.create({
  // baseURL: "https://e-commerce-e3ij.onrender.com",
  baseURL: "http://localhost:8080",
  timeout: 8000,
});
