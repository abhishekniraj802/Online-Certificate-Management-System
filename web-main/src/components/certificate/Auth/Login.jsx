
// web/src/components/certificate/Auth/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Slide,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Lock as LockIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

const Login = ({ updateNavButtons }) => {
  const navigate = useNavigate();
  
  // Form State
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  // UI State
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    type: "",
    message: "",
    show: false,
  });

  useEffect(() => {
    // Clear navigation buttons and check existing session
    updateNavButtons([]);
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      const role = localStorage.getItem("role");
      redirectBasedOnRole(role);
    }
  }, [updateNavButtons, navigate]);

  // Token validation helper
  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  // Role-based redirect helper
  const redirectBasedOnRole = (role) => {
    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "USER") {
      navigate("/dashboard");
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Show alert message
  const showAlert = (type, message) => {
    setAlertMessage({
      type,
      message,
      show: true,
    });
    // Auto hide success messages
    if (type === "success") {
      setTimeout(() => {
        setAlertMessage((prev) => ({ ...prev, show: false }));
      }, 3000);
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setAlertMessage((prev) => ({ ...prev, show: false }));

    try {
      const response = await axios.post(
        "https://ocms-backend.up.railway.app/authenticate",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      const token = response.data.jwtToken;
      if (token) {
        const decodedToken = jwtDecode(token);
        
        // Store user information
        localStorage.setItem("token", token);
        localStorage.setItem("role", decodedToken.Role);
        localStorage.setItem("userName", decodedToken.sub);
        
        showAlert("success", "Login successful! Redirecting...");
        
        // Redirect after a short delay
        setTimeout(() => {
          redirectBasedOnRole(decodedToken.Role);
        }, 1500);
      } else {
        showAlert("error", "Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      showAlert(
        "error",
        error.response?.data?.message || "Invalid username or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 50, color: "primary.main", mb: 2 }} />
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Login to OCMS
          </Typography>

          <Slide direction="down" in={alertMessage.show} mountOnEnter unmountOnExit>
            <Alert
              severity={alertMessage.type}
              sx={{ width: "100%", mb: 2 }}
              onClose={() => setAlertMessage((prev) => ({ ...prev, show: false }))}
            >
              {alertMessage.message}
            </Alert>
          </Slide>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
