import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_API_URL || "http://localhost:5000/";

const client = axios.create({
  baseURL,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default class API {
  static async login(data) {
    return client.post("users/login", data);
  }

  static async signUp(data) {
    return client.post("users/register", data);
  }

  static async getTweets() {
    return client.get("tweets/");
  }

  static async postTweet(data) {
    return client.post("tweets/", data);
  }
}
