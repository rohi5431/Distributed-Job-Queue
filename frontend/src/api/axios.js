import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  headers: {
    "x-api-key": "rohit123",
  },
  withCredentials: true,
});

// ✅ API FUNCTIONS
export const addJob = (data) => API.post("/add-job", data);

export const getJobs = () => API.get("/jobs");

export const getMetrics = () => API.get("/metrics");

export const pauseQueue = () => API.post("/pause");

export const resumeQueue = () => API.post("/resume");