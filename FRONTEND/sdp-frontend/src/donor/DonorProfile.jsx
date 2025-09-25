import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './donorcss/DonorProfile.css';

export default function DonorProfile() {
  const [donor, setDonor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDonor = sessionStorage.getItem('donor');
    if (storedDonor) setDonor(JSON.parse(storedDonor));
  }, []);

  if (!donor) return <div className="loading-message">Loading donor profile...</div>;

  return (
    <div className="donor-profile-container">
      <div className="donor-profile-header">
        <div className="donor-avatar">{donor.name?.charAt(0).toUpperCase() || 'D'}</div>
        <div className="donor-info">
          <h1>{donor.name}</h1>
          <p>Welcome back, {donor.name}.</p>
        </div>
      </div>

      <div className="donor-cards-grid">
        <div className="donor-card">
          <h3>👤 Personal Information</h3>
          <div className="field"><span>Full Name</span><span>{donor.name}</span></div>
          <div className="field"><span>Gender</span><span>{donor.gender || 'N/A'}</span></div>
          <div className="field"><span>Date of Birth</span><span>{donor.dob || 'N/A'}</span></div>
          <div className="field"><span>Username</span><span>{donor.username}</span></div>
        </div>

        <div className="donor-card">
          <h3>📞 Contact Information</h3>
          <div className="field"><span>Email</span><span>{donor.email}</span></div>
          <div className="field"><span>Mobile No</span><span>{donor.mobileno}</span></div>
          <div className="field"><span>Location</span><span>{donor.location}</span></div>
        </div>
      </div>

      <div className="donor-actions">
        <button onClick={() => navigate('/donor/update')}>✏️ Update Profile</button>
        <button onClick={() => navigate('/donor/dashboard')}>🏠 Back to Dashboard</button>
      </div>
    </div>
  );
}
