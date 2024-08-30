const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const protectedCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem("authToken");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export default protectedCall;
