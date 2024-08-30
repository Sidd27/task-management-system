import { TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { signupAPI } from "../api/signup";
import { useNavigate } from "react-router";
import { validateField, validateForm } from "../utils/validation";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validationRules = {
    name: { required: true },
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

  const handleSignup = async (e) => {
    setIsSubmitted(true);
    setLoading(true);
    e.preventDefault();
    setError(null);
    const formErrors = validateForm(values, validationRules);
    if (Object.keys(formErrors).length === 0) {
      try {
        const result = await signupAPI(
          values.name,
          values.username,
          values.password
        );
        console.log("Signup successful:", result);
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error(error);
        setError("Signup failed. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setFormErrors(formErrors);
      setLoading(false);
    }
  };
  return (
    <div className="flex-1 flex items-center justify-center p-8 md:border-l md:border-t-0 border-t">
      <div className="w-full max-w-sm">
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            variant="outlined"
            name="name"
            value={values.name}
            onChange={handleFieldChange}
            error={isSubmitted && !!formErrors.name}
            helperText={isSubmitted && formErrors.name}
          />
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
              size="large"
              variant="contained"
              color="secondary"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating Profile....." : "Sign Up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
