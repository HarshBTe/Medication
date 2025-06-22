import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// attach token automatically when present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["authorization"] = token;
  return config;
});

export const loginRequest = (payload) => API.post("/auth/login", payload);
export const signupRequest = (payload) => API.post("/auth/signup", payload);

export const getMedications = () => API.get("/medications");
export const addMedication = (data) => API.post("/medications", data);
export const markMedicationTaken = (id) => API.put(`/medications/${id}/taken`);