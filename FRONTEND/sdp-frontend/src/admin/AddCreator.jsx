import { useState } from "react";
import axios from "axios";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>
        Add Creator
      </h3>

      {message ? (
        <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>
          {message}
        </p>
      ) : (
        <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category</label>
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

        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Mobile No</label>
          <input
            type="number"
            id="mobileno"
            value={formData.mobileno}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location</label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="City, State"
          />
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
