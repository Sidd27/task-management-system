import { TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { loginAPI } from "../api/login";
import { useNavigate } from "react-router";
import { validateField, validateForm } from "../utils/validation";

function Login() {
  const [values, setValues] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Validation rules for the form fields
  const validationRules = {
    username: { required: true, minLength: 3 },
    password: { required: true, minLength: 6 },
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setFormErrors({
      ...formErrors,
      [name]: validateField(name, value, validationRules[name]),
    });
  };

  const handleLogin = async (e) => {
    setIsSubmitted(true);
    setLoading(true);
    e.preventDefault();
    setError(null);

    const formErrors = validateForm(values, validationRules);
    if (Object.keys(formErrors).length === 0) {
      try {
        const result = await loginAPI(values.username, values.password);
        console.log("Login successful:", result);
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error(error);
        setError(error.message || "Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setFormErrors(formErrors);
      setLoading(false);
    }
  };
  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-sm">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            variant="outlined"
            name="username"
            value={values.username}
            onChange={handleFieldChange}
            error={isSubmitted && !!formErrors.username}
            helperText={isSubmitted && formErrors.username}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            name="password"
            value={values.password}
            onChange={handleFieldChange}
            error={isSubmitted && !!formErrors.password}
            helperText={isSubmitted && formErrors.password}
          />
          {error && (
            <div className="p-2">
              <Typography color="error">{error}</Typography>
            </div>
          )}
          <div className="mt-4">
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
