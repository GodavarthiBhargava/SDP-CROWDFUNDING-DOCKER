import { useState, useEffect } from "react";
import axios from "axios";
import "./creatorcss/CreateCampaigns.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function CreateCampaigns() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    goalAmount: "",
    startDate: "",
    endDate: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [creatorId, setCreatorId] = useState(null); // Logged-in creator ID

  // Fetch logged-in creator info from localStorage/session
  useEffect(() => {
    const storedCreator = localStorage.getItem("creator") || sessionStorage.getItem("creator");
    if (storedCreator) {
      const creator = JSON.parse(storedCreator);
      setCreatorId(creator.id);
    } else {
      setError("Creator not logged in!");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setImage(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!creatorId) {
      setError("Creator ID not found. Please log in.");
      return;
    }

    // Validate form data
    if (!formData.title.trim()) {
      setError("Campaign title is required.");
      return;
    }
    if (!formData.description.trim()) {
      setError("Campaign description is required.");
      return;
    }
    if (!formData.category) {
      setError("Please select a category.");
      return;
    }
    if (!formData.goalAmount || formData.goalAmount <= 0) {
      setError("Please enter a valid goal amount.");
      return;
    }
    if (!formData.startDate) {
      setError("Please select a start date.");
      return;
    }
    if (!formData.endDate) {
      setError("Please select an end date.");
      return;
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError("End date must be after start date.");
      return;
    }
    if (!image) {
      setError("Please upload a campaign image.");
      return;
    }

    setError("");
    setMessage("Creating campaign...");

    try {
      const uploadData = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        uploadData.append(key, value)
      );
      uploadData.append("creatorId", creatorId); // Include creatorId
      if (image) uploadData.append("image", image);

      console.log(`Sending request to: ${API_URL}/campaign/add`);
      console.log("Form data:", Object.fromEntries(uploadData.entries()));

      const response = await axios.post(`${API_URL}/campaign/add`, uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(`Campaign created successfully! ${response.data}`);
      setError("");

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        goalAmount: "",
        startDate: "",
        endDate: "",
      });
      setImage(null);
      setImagePreview("");
    } catch (err) {
      console.error("Campaign creation error:", err);
      setMessage("");

      if (err.code === "ERR_NETWORK") {
        setError("Network error: Unable to connect to the server. Please check if the backend is running.");
      } else if (err.response?.status === 404) {
        setError("Server endpoint not found. Please check the API URL configuration.");
      } else if (err.response?.status === 500) {
        setError("Server error: " + (err.response?.data || "Internal server error"));
      } else {
        setError(err.response?.data || "Failed to create campaign. Please try again.");
      }
    }
  };

  return (
    <div className="campaign-container">
      <div className="campaign-form">
        <h2>Create New Campaign</h2>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="title">Campaign Title</label>
          <input type="text" id="title" value={formData.title} onChange={handleChange} required />

          <label htmlFor="description">Description</label>
          <textarea id="description" value={formData.description} onChange={handleChange} required />

          <label htmlFor="category">Category</label>
          <select id="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Startup">Startup</option>
            <option value="Charity">Charity</option>
            <option value="Sponsorship">Sponsorship</option>
            <option value="Healthcare">Healthcare</option>
          </select>

          <label htmlFor="goalAmount">Goal Amount</label>
          <input type="number" id="goalAmount" value={formData.goalAmount} onChange={handleChange} required />

          <label htmlFor="startDate">Start Date</label>
          <input type="date" id="startDate" value={formData.startDate} onChange={handleChange} required />

          <label htmlFor="endDate">End Date</label>
          <input type="date" id="endDate" value={formData.endDate} onChange={handleChange} required />

          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" onChange={handleImageChange} required />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: "100%",
                height: 160,
                objectFit: "cover",
                borderRadius: 8,
                marginBottom: 12,
                border: "1px solid #eee",
              }}
            />
          )}

          <button type="submit">Create Campaign</button>
        </form>
      </div>
    </div>
  );
}
