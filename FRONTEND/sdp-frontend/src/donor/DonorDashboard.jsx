import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './donorcss/DonorDashboard.css'

export default function DonorDashboard() {
  const [totalDonated, setTotalDonated] = useState(0)
  const [activeCount, setActiveCount] = useState(0)
  const [topCampaign, setTopCampaign] = useState(null)
  const API_URL = `${import.meta.env.VITE_API_URL}/campaign`

  const getDonations = () => {
    try { 
      return JSON.parse(localStorage.getItem('donations') || '{}') 
    } catch { 
      return {} 
    }
  }

  useEffect(() => {
    (async () => {
      const map = getDonations()
      const total = Object.values(map).reduce((s, v) => s + Number(v || 0), 0)
      setTotalDonated(total)

      try {
        const res = await axios.get(`${API_URL}/all`)
        const active = (res.data || []).filter(c => c.status === 'Active')
        setActiveCount(active.length)
        const ranked = [...active].sort((a, b) => (b.collectedAmount || 0) - (a.collectedAmount || 0))
        setTopCampaign(ranked[0] || null)
      } catch {
        setActiveCount(0)
      }
    })()
  }, [])

  return (
    <div className="dashboard-container">
      <h2>Donor Dashboard</h2>
      <div className="cards">
        <div className="stat-card">
          <div className="label">Total Donated</div>
          <div className="value">₹{totalDonated}</div>
        </div>
        <div className="stat-card">
          <div className="label">Active Campaigns</div>
          <div className="value">{activeCount}</div>
        </div>
        <div className="stat-card">
          <div className="label">Top Campaign</div>
          <div className="value">{topCampaign ? topCampaign.title : '—'}</div>
        </div>
      </div>

      <div className="quick-links">
        <a href="/donor/browse" className="ql">Browse Campaigns</a>
        <a href="/donor/mydonations" className="ql">My Donations</a>
      </div>
    </div>
  )
}
