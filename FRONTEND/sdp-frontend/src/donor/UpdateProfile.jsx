import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './donorcss/UpdateProfile.css';

const API_URL = `${import.meta.env.VITE_API_URL}/donor`;

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    mobileno: '',
    location: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedDonor = sessionStorage.getItem('donor');
    if (storedDonor) setFormData(JSON.parse(storedDonor));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/updateprofile`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        sessionStorage.setItem('donor', JSON.stringify(formData));
        setTimeout(() => navigate('/donor/profile'), 1000);
      }
    } catch (err) {
      setError(err.response?.data || 'Unexpected error occurred.');
    }
  };

  return (
    <div className="donor-update-container">
      <h3>Update Donor Profile</h3>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" id="name" value={formData.name} onChange={handleChange} required />

        <label>Gender</label>
        <input type="text" id="gender" value={formData.gender} readOnly />

        <label>Date of Birth</label>
        <input type="date" id="dob" value={formData.dob} readOnly />

        <label>Email</label>
        <input type="email" id="email" value={formData.email} onChange={handleChange} required />

        <label>Username</label>
        <input type="text" id="username" value={formData.username} readOnly />

        <label>Password</label>
        <input type="password" id="password" value={formData.password} onChange={handleChange} required />

        <label>Mobile No</label>
        <input type="number" id="mobileno" value={formData.mobileno} onChange={handleChange} required />

        <label>Location</label>
        <input type="text" id="location" value={formData.location} onChange={handleChange} required />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
