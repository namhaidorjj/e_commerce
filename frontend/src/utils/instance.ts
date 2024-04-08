/** @format */

import axios from "axios";

export const instance = axios.create({
  baseURL: "//e-commerce-e3ij.onrender.com",
  timeout: 8000,
});
