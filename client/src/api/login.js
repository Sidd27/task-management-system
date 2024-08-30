import { setCredentials } from "../reducers/authReducer";
import store from "../store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginAPI = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid Credentials");
      } else {
        throw new Error("Failed to Login");
      }
    }

    const data = await response.json();
    const { token, user } = data;

    // Dispatch action to store credentials
    store.dispatch(setCredentials({ token, user }));

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
