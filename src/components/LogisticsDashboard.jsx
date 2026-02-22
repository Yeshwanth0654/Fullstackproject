import React, { useState } from 'react';
import { STORAGE_KEYS, saveToStorage, getFromStorage } from '../utils/storage';

function LogisticsDashboard({ user, onBack }) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    status: 'in_transit',
    logistics_contact: ''
  });
  const [message, setMessage] = useState('');

  const shipments = getFromStorage(STORAGE_KEYS.SHIPMENTS);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newShipment = {
      ...formData,
      id: Date.now(),
      created_by: user.email,
      created_at: new Date().toISOString()
    };
    const allShipments = getFromStorage(STORAGE_KEYS.SHIPMENTS);
    allShipments.push(newShipment);
    saveToStorage(STORAGE_KEYS.SHIPMENTS, allShipments);
    setMessage('Shipment updated successfully!');
    setFormData({ title: '', location: '', status: 'in_transit', logistics_contact: '' });
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
              <h1 style={styles.headerTitle}>Logistics Dashboard</h1>
              <p style={styles.headerSubtitle}>Coordinate deliveries and manage inventory</p>
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
          <div style={{...styles.statCard, borderLeft: '4px solid #3b82f6'}}>
            <p style={styles.statLabel}>Total Shipments</p>
            <p style={{...styles.statValue, color: '#3b82f6'}}>{shipments.length}</p>
          </div>
          <div style={{...styles.statCard, borderLeft: '4px solid #3b82f6'}}>
            <p style={styles.statLabel}>In Transit</p>
            <p style={{...styles.statValue, color: '#3b82f6'}}>
              {shipments.filter(s => s.status === 'in_transit').length}
            </p>
          </div>
          <div style={{...styles.statCard, borderLeft: '4px solid #3b82f6'}}>
            <p style={styles.statLabel}>Delivered</p>
            <p style={{...styles.statValue, color: '#3b82f6'}}>
              {shipments.filter(s => s.status === 'delivered').length}
            </p>
          </div>
        </div>

        {/* Update Shipment Form */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Update Shipment Status</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="title" style={styles.label}>Shipment Reference</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                style={styles.input}
                placeholder="e.g. Food packs to Evacuation Center A"
                className="focus-outline"
              />
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="logistics_contact" style={styles.label}>Coordinator Contact</label>
                <input
                  id="logistics_contact"
                  name="logistics_contact"
                  type="text"
                  value={formData.logistics_contact}
                  onChange={(e) => setFormData({...formData, logistics_contact: e.target.value})}
                  style={styles.input}
                  placeholder="Name / phone"
                  className="focus-outline"
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="status" style={styles.label}>Delivery Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  style={styles.input}
                  className="focus-outline"
                >
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="pending_pickup">Pending Pickup</option>
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="location" style={styles.label}>Current / Destination Location</label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                style={styles.input}
                placeholder="From / To"
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
              Update Shipment
            </button>
          </form>
        </div>

        {/* All Shipments */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>All Shipments</h2>
          <div style={styles.shipmentsList}>
            {shipments.length === 0 ? (
              <p style={styles.emptyMessage}>
                No shipments tracked yet. Add your first shipment update above!
              </p>
            ) : (
              shipments.map((shipment) => (
                <div 
                  key={shipment.id}
                  style={styles.shipmentItem}
                >
                  <h3 style={styles.shipmentTitle}>{shipment.title}</h3>
                  <div style={styles.shipmentMeta}>
                    <span>📍 {shipment.location || 'N/A'}</span>
                    {shipment.logistics_contact && (
                      <span>👤 {shipment.logistics_contact}</span>
                    )}
                  </div>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: shipment.status === 'delivered' ? '#d1fae5' : '#dbeafe',
                    color: shipment.status === 'delivered' ? '#065f46' : '#1e40af'
                  }}>
                    {shipment.status.replace('_', ' ')}
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
    background: 'linear-gradient(to bottom right, #eff6ff, #ecfeff)'
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    borderBottom: '4px solid #3b82f6'
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
    backgroundColor: '#dbeafe',
    color: '#2563eb',
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
    color: '#2563eb'
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
    border: '2px solid #dbeafe',
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
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  shipmentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  emptyMessage: {
    color: '#4b5563',
    textAlign: 'center',
    padding: '2rem'
  },
  shipmentItem: {
    padding: '1rem',
    borderRadius: '0.75rem',
    backgroundColor: '#eff6ff',
    borderLeft: '4px solid #3b82f6'
  },
  shipmentTitle: {
    fontWeight: '600',
    color: '#1f2937',
    fontSize: '1.125rem'
  },
  shipmentMeta: {
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
    fontWeight: '500'
  }
};

export default LogisticsDashboard;