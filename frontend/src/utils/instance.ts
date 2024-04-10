/** @format */

import axios from "axios";
const localBackEnd = "http://localhost:8080";
const deployedBackEnd = "//e-commerce-e3ij.onrender.com";
export const instance = axios.create({
<<<<<<< HEAD
  baseURL: localBackEnd,
=======
  baseURL: deployedBackEnd,
>>>>>>> main
  timeout: 8000,
});
