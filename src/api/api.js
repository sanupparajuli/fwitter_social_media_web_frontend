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


// Get All Tweets
export const getAllTweets = async () => {
  try {
    console.log(" Fetching Tweets...");
    const response = await API.get("/tweets/show_tweet");
    console.log(" Tweets Fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Fetch Tweets Error:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};
export const likeTweet = async (tweetId) => {
  try {
    console.log(`Liking Tweet: ${tweetId}`);
    const response = await API.post(`/tweets/${tweetId}/like`);
    console.log("Tweet Liked:", response.data);
    return response.data;
  } catch (error) {
    console.error("Like Tweet Error:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

export const unlikeTweet = async (tweetId) => {
  try {
    console.log(`Unliking Tweet: ${tweetId}`);
    const response = await API.delete(`/tweets/${tweetId}/unlike`);
    console.log(" Tweet Unliked:", response.data);
    return response.data;
  } catch (error) {
    console.error(" Unlike Tweet Error:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

export const retweet = async (tweetId) => {
  try {
    console.log(` Retweeting: ${tweetId}`);
    const response = await API.post(`/tweets/${tweetId}/retweet`);
    console.log(" Retweeted:", response.data);
    return response.data;
  } catch (error) {
    console.error(" Retweet Error:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

export const unretweet = async (tweetId) => {
  try {
    console.log(` Removing Retweet: ${tweetId}`);
    const response = await API.delete(`/tweets/${tweetId}/unretweet`);
    console.log(" Retweet Removed:", response.data);
    return response.data;
  } catch (error) {
    console.error(" Unretweet Error:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};