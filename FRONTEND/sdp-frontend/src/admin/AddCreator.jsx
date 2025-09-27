import { useState } from "react";
import axios from "axios";
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiTag } from "react-icons/fi";
import "./admincss/AddCreator.css";

const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export default function AddCreator() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    email: "",
    username: "",
    password: "",
    mobileno: "",
    location: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/addcreator`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError("");
        setFormData({
          name: "",
          category: "",
          email: "",
          username: "",
          password: "",
          mobileno: "",
          location: ""
        });
      }
    } catch (error) {
      setMessage("");
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-creator-container">
      <div className="add-creator-form">
        <h2>Add New Creator</h2>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-group">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <div className="input-group">
                <FiTag className="input-icon" />
                <select
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option>Startup</option>
                  <option>Charity</option>
                  <option>Sponsorship</option>
                  <option>Healthcare</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-group">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-group">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="mobileno">Mobile No</label>
              <div className="input-group">
                <FiPhone className="input-icon" />
                <input
                  type="tel"
                  id="mobileno"
                  value={formData.mobileno}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="location">Location</label>
            <div className="input-group">
              <FiMapPin className="input-icon" />
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="City, State"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding Creator..." : "Add Creator"}
          </button>
        </form>
      </div>
    </div>
  );
}
