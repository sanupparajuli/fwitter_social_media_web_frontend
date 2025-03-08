import axios from "axios";

// Set up Axios instance
const API = axios.create({
  baseURL: "http://localhost:8080/api", // Make sure this matches your backend
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// User Login
export const loginUser = async (userData) => {
  try {
    console.log(" Sending Login Data:", userData); //  Log request
    const response = await API.post("/users/login", userData);
    console.log(" Login Success:", response.data);
    return response.data;
  } catch (error) {
    console.error(" Login Error:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// User Registration
export const registerUser = async (userData) => {
  try {
    console.log(" Sending Registration Data:", userData); //  Log request
    const response = await API.post("/users/register", userData);
    console.log(" Registration Success:", response.data);
    return response.data;
  } catch (error) {
    console.error(" Registration Error:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};