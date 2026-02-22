import React, { useState } from 'react';
import { STORAGE_KEYS, saveToStorage, getFromStorage } from '../utils/storage';

function RecipientDashboard({ user, onBack }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'food',
    quantity: '',
    location: '',
    priority: 'high'
  });
  const [message, setMessage] = useState('');

  const myRequests = getFromStorage(STORAGE_KEYS.REQUESTS).filter(r => r.created_by === user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      ...formData,
      id: Date.now(),
      quantity: Number(formData.quantity) || 0,
      status: 'open',
      recipient_name: user.name,
      created_by: user.email,
      created_at: new Date().toISOString()
    };
    const allRequests = getFromStorage(STORAGE_KEYS.REQUESTS);
    allRequests.push(newRequest);
    saveToStorage(STORAGE_KEYS.REQUESTS, allRequests);
    setMessage('Request submitted successfully!');
    setFormData({ title: '', description: '', category: 'food', quantity: '', location: '', priority: 'high' });
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
              <h1 style={styles.headerTitle}>Recipient Dashboard</h1>
              <p style={styles.headerSubtitle}>Request essentials and track deliveries</p>
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
          <div style={{...styles.statCard, borderLeft: '4px solid #ef4444'}}>
            <p style={styles.statLabel}>My Requests</p>
            <p style={{...styles.statValue, color: '#ef4444'}}>{myRequests.length}</p>
          </div>
          <div style={{...styles.statCard, borderLeft: '4px solid #ef4444'}}>
            <p style={styles.statLabel}>Open Requests</p>
            <p style={{...styles.statValue, color: '#ef4444'}}>
              {myRequests.filter(r => r.status === 'open').length}
            </p>
          </div>
        </div>

        {/* Request Form */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Submit New Request</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="title" style={styles.label}>What do you need most?</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                style={styles.input}
                placeholder="e.g. 30 family food packs"
                className="focus-outline"
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="description" style={styles.label}>Additional Details</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                style={{...styles.input, resize: 'none'}}
                placeholder="Share who will receive the items and any important context"
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
                  <option value="medical">Medical Essentials</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="quantity" style={styles.label}>Estimated Quantity</label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  style={styles.input}
                  placeholder="e.g. 30"
                  className="focus-outline"
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="priority" style={styles.label}>Urgency</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  style={styles.input}
                  className="focus-outline"
                >
                  <option value="high">Critical – within 24 hrs</option>
                  <option value="medium">Within 3 days</option>
                  <option value="low">Flexible timing</option>
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="location" style={styles.label}>Delivery Location</label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                style={styles.input}
                placeholder="Evacuation center / address"
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
              Submit Request
            </button>
          </form>
        </div>

        {/* My Requests */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>My Requests</h2>
          <div style={styles.requestsList}>
            {myRequests.length === 0 ? (
              <p style={styles.emptyMessage}>
                You haven't submitted any requests yet. Submit your first request above!
              </p>
            ) : (
              myRequests.map((request) => (
                <div 
                  key={request.id}
                  style={styles.requestItem}
                >
                  <h3 style={styles.requestTitle}>{request.title}</h3>
                  {request.description && (
                    <p style={styles.requestDescription}>{request.description}</p>
                  )}
                  <div style={styles.requestMeta}>
                    <span>📦 {request.category}</span>
                    <span>🔢 Qty: {request.quantity}</span>
                    <span>📍 {request.location || 'N/A'}</span>
                    <span style={request.priority === 'high' ? {fontWeight: '600'} : {}}>
                      {request.priority === 'high' ? '🔴' : request.priority === 'medium' ? '🟡' : '🟢'} {request.priority}
                    </span>
                  </div>
                  <span style={styles.statusBadge}>
                    {request.status}
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
    background: 'linear-gradient(to bottom right, #fef2f2, #fdf2f8)'
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    borderBottom: '4px solid #ef4444'
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
    backgroundColor: '#fee2e2',
    color: '#dc2626',
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
    color: '#dc2626'
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
    border: '2px solid #fee2e2',
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
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  requestsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  emptyMessage: {
    color: '#4b5563',
    textAlign: 'center',
    padding: '2rem'
  },
  requestItem: {
    padding: '1rem',
    borderRadius: '0.75rem',
    backgroundColor: '#fef2f2',
    borderLeft: '4px solid #ef4444'
  },
  requestTitle: {
    fontWeight: '600',
    color: '#1f2937',
    fontSize: '1.125rem'
  },
  requestDescription: {
    color: '#4b5563',
    marginTop: '0.25rem'
  },
  requestMeta: {
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
    backgroundColor: '#fee2e2',
    color: '#991b1b'
  }
};

export default RecipientDashboard;