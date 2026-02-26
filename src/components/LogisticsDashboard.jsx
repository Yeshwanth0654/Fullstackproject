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
    <div style={styles.container} className="ui-shell">
      <div style={styles.wrap} className="ui-wrap">
        <header style={styles.header} className="ui-panel">
          <div style={styles.headerLeft}>
            <button onClick={onBack} style={styles.backButton} className="focus-outline">Back</button>
            <div>
              <h1 style={styles.headerTitle}>Logistics Dashboard</h1>
              <p style={styles.headerSubtitle}>Coordinate deliveries and manage inventory</p>
            </div>
          </div>
          <div style={styles.headerRight}><p style={styles.userName}>{user.name}</p><p style={styles.userEmail}>{user.email}</p></div>
        </header>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}><p style={styles.statLabel}>Total Shipments</p><p style={styles.statValue}>{shipments.length}</p></div>
          <div style={styles.statCard}><p style={styles.statLabel}>In Transit</p><p style={styles.statValue}>{shipments.filter((s) => s.status === 'in_transit').length}</p></div>
          <div style={styles.statCard}><p style={styles.statLabel}>Delivered</p><p style={styles.statValue}>{shipments.filter((s) => s.status === 'delivered').length}</p></div>
        </div>

        <div style={styles.card} className="section-card">
          <h2 style={styles.cardTitle}>Update Shipment Status</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="title" style={styles.label}>Shipment Reference</label>
              <input id="title" name="title" type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={styles.input} placeholder="Food packs to Center A" className="focus-outline" />
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="logistics_contact" style={styles.label}>Coordinator Contact</label>
                <input id="logistics_contact" name="logistics_contact" type="text" value={formData.logistics_contact} onChange={(e) => setFormData({ ...formData, logistics_contact: e.target.value })} style={styles.input} placeholder="Name or phone" className="focus-outline" />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="status" style={styles.label}>Delivery Status</label>
                <select id="status" name="status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={styles.input} className="focus-outline">
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="pending_pickup">Pending Pickup</option>
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="location" style={styles.label}>Current or Destination Location</label>
              <input id="location" name="location" type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} style={styles.input} placeholder="From or to" className="focus-outline" />
            </div>

            {message && <div style={styles.successMessage}>{message}</div>}

            <button type="submit" style={styles.submitButton} className="focus-outline">Update Shipment</button>
          </form>
        </div>

        <div style={styles.card} className="section-card">
          <h2 style={styles.cardTitle}>All Shipments</h2>
          <div style={styles.list}>
            {shipments.length === 0 ? (
              <p style={styles.emptyMessage}>No shipments tracked yet.</p>
            ) : (
              shipments.map((shipment) => (
                <div key={shipment.id} style={styles.item}>
                  <h3 style={styles.itemTitle}>{shipment.title}</h3>
                  <div style={styles.itemMeta}>
                    <span>{shipment.location || 'N/A'}</span>
                    {shipment.logistics_contact && <span>{shipment.logistics_contact}</span>}
                    <span style={shipment.status === 'delivered' ? styles.goodStatus : styles.infoStatus}>{shipment.status.replace('_', ' ')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh' },
  wrap: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  header: { padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.7rem' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' },
  backButton: { backgroundColor: '#dbeafe', color: '#1e3a8a', padding: '0.45rem 0.8rem', borderRadius: '0.6rem', border: '1px solid #93c5fd', cursor: 'pointer', fontWeight: '700' },
  headerTitle: { fontSize: '1.4rem', fontWeight: '900', color: '#0f172a' },
  headerSubtitle: { fontSize: '0.88rem', color: '#64748b' },
  headerRight: { textAlign: 'right' },
  userName: { fontWeight: '700', color: '#0f172a' },
  userEmail: { fontSize: '0.82rem', color: '#64748b' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.75rem' },
  statCard: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.95rem', padding: '0.9rem', boxShadow: '0 16px 28px -26px rgba(15, 23, 42, 0.45)' },
  statLabel: { color: '#64748b', fontSize: '0.82rem', marginBottom: '0.2rem' },
  statValue: { fontSize: '1.7rem', fontWeight: '900', color: '#1d4ed8' },
  card: { padding: '1.2rem' },
  cardTitle: { fontSize: '1.18rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.8rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  formRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' },
  formGroup: { display: 'flex', flexDirection: 'column' },
  label: { marginBottom: '0.34rem', fontWeight: '700', fontSize: '0.84rem', color: '#334155' },
  input: { width: '100%', borderRadius: '0.68rem', padding: '0.62rem 0.8rem', border: '1px solid #cbd5e1', fontSize: '0.92rem', backgroundColor: '#ffffff', color: '#0f172a' },
  successMessage: { backgroundColor: '#dcfce7', color: '#166534', textAlign: 'center', padding: '0.48rem 0.7rem', borderRadius: '0.58rem', border: '1px solid #86efac' },
  submitButton: { width: '100%', borderRadius: '0.68rem', padding: '0.7rem', fontWeight: '700', backgroundColor: '#2563eb', color: 'white', border: '1px solid #1d4ed8', cursor: 'pointer' },
  list: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  emptyMessage: { color: '#64748b', textAlign: 'center', padding: '1.2rem' },
  item: { padding: '0.85rem', borderRadius: '0.75rem', backgroundColor: '#eff6ff', border: '1px solid #93c5fd' },
  itemTitle: { fontWeight: '700', color: '#0f172a', fontSize: '1rem' },
  itemMeta: { display: 'flex', gap: '0.6rem', marginTop: '0.45rem', fontSize: '0.8rem', color: '#64748b', flexWrap: 'wrap' },
  goodStatus: { color: '#166534', fontWeight: '700' },
  infoStatus: { color: '#1e3a8a', fontWeight: '700' }
};

export default LogisticsDashboard;
