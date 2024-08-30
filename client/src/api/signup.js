import { setCredentials } from "../reducers/authReducer";
import store from "../store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signupAPI = async (name, username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    const data = await response.json();
    const { token, user } = data;

    // Dispatch action to store credentials
    store.dispatch(setCredentials({ token, user }));

    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};
