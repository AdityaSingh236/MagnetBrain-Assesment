import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://magnetbrain-assesment.onrender.com",
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerUser = async (name, email, password) => {
  try {
    const res = await API.post("/api/auth/register", { name, email, password });
    // Response: { token, user: { id, name, email } }
    return res.data;
  } catch (err) {
    console.error("Register Error:", err.response?.data?.message || err.message);
    throw new Error(err.response?.data?.message || "Registration failed");
  }
};


export const loginUser = async (email, password) => {
  try {
    const res = await API.post("/api/auth/login", { email, password });
    // Response: { token, user: { id, name, email } }
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

export const createTask = async (taskData) => {
  try {
    // Token already attached by interceptor
    const res = await API.post("/api/tasks", taskData);
    return res.data; // backend se task ka data milega
  } catch (err) {
    console.error("Error creating task:", err.response?.data?.message || err.message);
    throw new Error(err.response?.data?.message || "Failed to create task");
  }
};

export const fetchTasks = async (page = 1, limit = 5) => {
  try {
    const res = await API.get("/api/tasks", {
      params: { page, limit }, 
    });
    return res.data; 
  } catch (err) {
    console.error("Error fetching tasks:", err.response?.data?.message || err.message);
    throw new Error(err.response?.data?.message || "Failed to fetch tasks");
  }
};

export const fetchTask = async (id) => {
  try {
    const res = await API.get(`/api/tasks/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching task:", err.response?.data?.message || err.message);
    throw new Error(err.response?.data?.message || "Failed to fetch task");
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const res = await API.put(`/api/tasks/${id}`, taskData);
    return res.data; // updated task object
  } catch (err) {
    console.error("Error updating task:", err.response?.data?.message || err.message);
    throw new Error(err.response?.data?.message || "Failed to update task");
  }
};

export const deleteTask = async (id) => {
  try {
    const res = await API.delete(`/api/tasks/${id}`);
    return res.data; // { message: "Task deleted" }
  } catch (err) {
    console.error("Error deleting task:", err.response?.data?.message || err.message);
    throw new Error(err.response?.data?.message || "Failed to delete task");
  }
};

export default API;
