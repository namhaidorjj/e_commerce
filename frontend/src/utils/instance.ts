/** @format */

import axios from "axios";
const localBackEnd = "http://localhost:8080";
const deployedBackEnd = "//e-commerce-e3ij.onrender.com";
export const instance = axios.create({

  baseURL: deployedBackEnd,
  timeout: 8000,
});
