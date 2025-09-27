import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./creatorcss/CreatorRegistration.css";

const API_URL = `${import.meta.env.VITE_API_URL}/creator`;

export default function CreatorRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      };
      await axios.post(`${API_URL}/register`, payload);
      setMessage("Registration successful. Please login.");
      setTimeout(() => navigate("/creator/login"), 1200);
    } catch (err) {
      setError(err.response?.data || "Unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container creator-register-container">
      <div className="login-form creator-register-form">
        <h2>Creator Registration</h2>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <div className="input-group">
            <span className="input-icon">👤</span>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="email">Email</label>
          <div className="input-group">
            <span className="input-icon">✉️</span>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="username">Username</label>
          <div className="input-group">
            <span className="input-icon">🆔</span>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signin-button" disabled={loading}>
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="signup-link">
          Already have an account? <Link to="/creator/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
