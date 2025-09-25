import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './donorcss/BrowseCampaigns.css'

export default function MyDonations() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  const API_URL = `${import.meta.env.VITE_API_URL}/campaign`

  const getStoredDonations = () => {
    try {
      const raw = localStorage.getItem('donations')
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  }

  useEffect(() => {
    const load = async () => {
      try {
        const donationsMap = getStoredDonations()
        const ids = Object.keys(donationsMap)
        if (ids.length === 0) {
          setItems([])
          return
        }

        const res = await axios.get(`${API_URL}/all`)
        const campaigns = res.data || []
        const filtered = campaigns
          .filter(c => ids.includes(String(c.id)))
          .map(c => ({
            id: c.id,
            title: c.title,
            description: c.description,
            category: c.category,
            goalAmount: c.goalAmount,
            donated: Number(donationsMap[c.id] || 0),
            startDate: c.startDate,
            endDate: c.endDate,
          }))

        setItems(filtered)
        setError('')
      } catch (e) {
        setError('Failed to load donations')
      }
    }
    load()
  }, [])

  return (
    <div className="browsecampaigns-container">
      <h2>My Donations</h2>
      {error && <p className="error-message">{error}</p>}

      {items.length === 0 ? (
        <p>You have not donated yet in this session.</p>
      ) : (
        <div className="campaign-table-wrap">
          <table className="campaign-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Category</th>
                <th>Donated</th>
                <th>Goal</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              {items.map(it => (
                <tr key={it.id}>
                  <td>
                    <div className="table-title">{it.title}</div>
                    <div className="table-desc">
                      {(it.description || '').slice(0, 120)}
                      {(it.description || '').length > 120 ? '…' : ''}
                    </div>
                  </td>
                  <td><span className="badge">{it.category}</span></td>
                  <td className="raised">₹{it.donated}</td>
                  <td>₹{it.goalAmount}</td>
                  <td>{it.startDate}</td>
                  <td>{it.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
