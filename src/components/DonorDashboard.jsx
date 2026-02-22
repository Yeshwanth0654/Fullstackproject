import React, { useState } from 'react';
import { STORAGE_KEYS, saveToStorage, getFromStorage } from '../utils/storage';

function DonorDashboard({ user, onBack }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'food',
    quantity: '',
    location: '',
    priority: 'high'
  });
  const [message, setMessage] = useState('');

  const myDonations = getFromStorage(STORAGE_KEYS.DONATIONS).filter(d => d.created_by === user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDonation = {
      ...formData,
      id: Date.now(),
      quantity: Number(formData.quantity) || 0,
      status: 'available',
      donor_name: user.name,
      created_by: user.email,
      created_at: new Date().toISOString()
    };
    const allDonations = getFromStorage(STORAGE_KEYS.DONATIONS);
    allDonations.push(newDonation);
    saveToStorage(STORAGE_KEYS.DONATIONS, allDonations);
    setMessage('Donation listed successfully!');
    setFormData({ title: '', category: 'food', quantity: '', location: '', priority: 'high' });
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <button
              onClick={onBack}
              style={styles.backButton}
              className="focus-outline"
            >
              ← Back
            </button>
            <div>
              <h1 style={styles.headerTitle}>Donor Dashboard</h1>
              <p style={styles.headerSubtitle}>List and track your donations</p>
            </div>
          </div>
          <div style={styles.headerRight}>
            <p style={styles.userName}>{user.name}</p>
            <p style={styles.userEmail}>{user.email}</p>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        {/* Stats */}
        <div style={styles.statsGrid}>
          <div style={{...styles.statCard, borderLeft: '4px solid #10b981'}}>
            <p style={styles.statLabel}>My Donations</p>
            <p style={{...styles.statValue, color: '#10b981'}}>{myDonations.length}</p>
          </div>
          <div style={{...styles.statCard, borderLeft: '4px solid #10b981'}}>
            <p style={styles.statLabel}>Total Items Donated</p>
            <p style={{...styles.statValue, color: '#10b981'}}>
              {myDonations.reduce((sum, d) => sum + (Number(d.quantity) || 0), 0)}
            </p>
          </div>
        </div>

        {/* List Donation Form */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>List New Donation</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="title" style={styles.label}>What are you donating?</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                style={styles.input}
                placeholder="e.g. 20 packs of canned goods"
                className="focus-outline"
              />
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="category" style={styles.label}>Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  style={styles.input}
                  className="focus-outline"
                >
                  <option value="food">Food</option>
                  <option value="clothing">Clothing</option>
                  <option value="shelter">Shelter Items</option>
                  <option value="hygiene">Hygiene Kits</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="quantity" style={styles.label}>Quantity</label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  style={styles.input}
                  placeholder="e.g. 20"
                  className="focus-outline"
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="priority" style={styles.label}>Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  style={styles.input}
                  className="focus-outline"
                >
                  <option value="high">High-need areas</option>
                  <option value="medium">Medium-need areas</option>
                  <option value="low">Long-term support</option>
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="location" style={styles.label}>Pickup Location</label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                style={styles.input}
                placeholder="City / Barangay"
                className="focus-outline"
              />
            </div>

            {message && (
              <div style={styles.successMessage}>
                {message}
              </div>
            )}

            <button
              type="submit"
              style={styles.submitButton}
              className="focus-outline"
            >
              List Donation
            </button>
          </form>
        </div>

        {/* My Donations */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>My Donations</h2>
          <div style={styles.donationsList}>
            {myDonations.length === 0 ? (
              <p style={styles.emptyMessage}>
                You haven't listed any donations yet. Start by listing your first donation above!
              </p>
            ) : (
              myDonations.map((donation) => (
                <div 
                  key={donation.id}
                  style={styles.donationItem}
                >
                  <h3 style={styles.donationTitle}>{donation.title}</h3>
                  <div style={styles.donationMeta}>
                    <span>📦 {donation.category}</span>
                    <span>🔢 Qty: {donation.quantity}</span>
                    <span>📍 {donation.location || 'N/A'}</span>
                    <span style={donation.priority === 'high' ? {fontWeight: '600'} : {}}>
                      {donation.priority === 'high' ? '🔴' : donation.priority === 'medium' ? '🟡' : '🟢'} {donation.priority}
                    </span>
                  </div>
                  <span style={styles.statusBadge}>
                    {donation.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #f0fdf4, #ecfdf5)'
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    borderBottom: '4px solid #10b981'
  },
  headerContent: {
    maxWidth: '80rem',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  backButton: {
    backgroundColor: '#d1fae5',
    color: '#059669',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#059669'
  },
  headerSubtitle: {
    fontSize: '0.875rem',
    color: '#4b5563'
  },
  headerRight: {
    textAlign: 'right'
  },
  userName: {
    fontWeight: '500',
    color: '#1f2937'
  },
  userEmail: {
    fontSize: '0.875rem',
    color: '#4b5563'
  },
  main: {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  statLabel: {
    color: '#4b5563',
    marginBottom: '0.25rem'
  },
  statValue: {
    fontSize: '2.25rem',
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '1rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '0.375rem',
    fontWeight: '500',
    color: '#374151'
  },
  input: {
    width: '100%',
    borderRadius: '0.75rem',
    padding: '0.5rem 1rem',
    border: '2px solid #d1fae5',
    fontSize: '1rem'
  },
  successMessage: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    textAlign: 'center',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.5rem'
  },
  submitButton: {
    width: '100%',
    borderRadius: '0.75rem',
    padding: '0.75rem',
    fontWeight: '600',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  donationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  emptyMessage: {
    color: '#4b5563',
    textAlign: 'center',
    padding: '2rem'
  },
  donationItem: {
    padding: '1rem',
    borderRadius: '0.75rem',
    backgroundColor: '#f0fdf4',
    borderLeft: '4px solid #10b981'
  },
  donationTitle: {
    fontWeight: '600',
    color: '#1f2937',
    fontSize: '1.125rem'
  },
  donationMeta: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    color: '#4b5563'
  },
  statusBadge: {
    display: 'inline-block',
    marginTop: '0.5rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500',
    backgroundColor: '#d1fae5',
    color: '#065f46'
  }
};

export default DonorDashboard;