import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './creatorcss/CreatorDashboard.css'

export default function CreatorDashboard() {
  const [stats, setStats] = useState({ count: 0, raised: 0, top: null })
  const API_URL = `${import.meta.env.VITE_API_URL}/campaign`

  useEffect(() => {
    (async () => {
      try {
        const storedCreator = localStorage.getItem('creator')
        const creatorId = storedCreator ? JSON.parse(storedCreator).id : null
        if (!creatorId) { 
          setStats({ count: 0, raised: 0, top: null }) 
          return 
        }

        const res = await axios.get(`${API_URL}/by-creator/${creatorId}`)
        const list = res.data || []

        const donationsMap = (() => { 
          try { 
            return JSON.parse(localStorage.getItem('donations') || '{}') 
          } catch { 
            return {} 
          } 
        })()

        const merged = list.map(c => ({ 
          ...c, 
          collectedAmount: Number(c.collectedAmount || 0) + Number(donationsMap[c.id] || 0) 
        }))

        const count = merged.length
        const raised = merged.reduce((s, c) => s + Number(c.collectedAmount || 0), 0)
        const top = merged.sort((a, b) => (b.collectedAmount || 0) - (a.collectedAmount || 0))[0] || null

        setStats({ count, raised, top })
      } catch {
        setStats({ count: 0, raised: 0, top: null })
      }
    })()
  }, [])

  return (
    <div className="dashboard-container">
      <h2>Creator Dashboard</h2>
      <div className="cards">
        <div className="stat-card">
          <div className="label">My Campaigns</div>
          <div className="value">{stats.count}</div>
        </div>
        <div className="stat-card">
          <div className="label">Total Raised</div>
          <div className="value">₹{stats.raised}</div>
        </div>
        <div className="stat-card">
          <div className="label">Top Campaign</div>
          <div className="value">{stats.top ? stats.top.title : '—'}</div>
        </div>
      </div>

      <div className="quick-links">
        <a href="/creator/createcampaigns" className="ql">Create Campaign</a>
        <a href="/creator/mycampaigns" className="ql">My Campaigns</a>
        <a href="/creator/donors" className="ql">Donor List</a>
      </div>
    </div>
  )
}
