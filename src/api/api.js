import axios from "axios";

// Set up Axios instance
const API = axios.create({
  baseURL: "http://localhost:8080/api", // Make sure this matches your backend
  headers: { "Content-Type": "application/json" },
});
