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

  const myDonations = getFromStorage(STORAGE_KEYS.DONATIONS).filter((d) => d.created_by === user.email);

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
    <div style={styles.container} className="ui-shell">
      <div style={styles.wrap} className="ui-wrap">
        <header style={styles.header} className="ui-panel">
          <div style={styles.headerLeft}>
            <button onClick={onBack} style={styles.backButton} className="focus-outline">Back</button>
            <div>
              <h1 style={styles.headerTitle}>Donor Dashboard</h1>
              <p style={styles.headerSubtitle}>List and track your donations</p>
            </div>
          </div>
          <div style={styles.headerRight}><p style={styles.userName}>{user.name}</p><p style={styles.userEmail}>{user.email}</p></div>
        </header>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}><p style={styles.statLabel}>My Donations</p><p style={styles.statValue}>{myDonations.length}</p></div>
          <div style={styles.statCard}><p style={styles.statLabel}>Items Donated</p><p style={styles.statValue}>{myDonations.reduce((sum, d) => sum + (Number(d.quantity) || 0), 0)}</p></div>
        </div>

        <div style={styles.card} className="section-card">
          <h2 style={styles.cardTitle}>List New Donation</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="title" style={styles.label}>Donation Item</label>
              <input id="title" name="title" type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={styles.input} placeholder="20 packs of canned goods" className="focus-outline" />
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="category" style={styles.label}>Category</label>
                <select id="category" name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={styles.input} className="focus-outline">
                  <option value="food">Food</option>
                  <option value="clothing">Clothing</option>
                  <option value="shelter">Shelter Items</option>
                  <option value="hygiene">Hygiene Kits</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="quantity" style={styles.label}>Quantity</label>
                <input id="quantity" name="quantity" type="number" min="1" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} style={styles.input} placeholder="20" className="focus-outline" />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="priority" style={styles.label}>Priority</label>
                <select id="priority" name="priority" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} style={styles.input} className="focus-outline">
                  <option value="high">High-need areas</option>
                  <option value="medium">Medium-need areas</option>
                  <option value="low">Long-term support</option>
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="location" style={styles.label}>Pickup Location</label>
              <input id="location" name="location" type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} style={styles.input} placeholder="City or locality" className="focus-outline" />
            </div>

            {message && <div style={styles.successMessage}>{message}</div>}

            <button type="submit" style={styles.submitButton} className="focus-outline">List Donation</button>
          </form>
        </div>

        <div style={styles.card} className="section-card">
          <h2 style={styles.cardTitle}>My Donations</h2>
          <div style={styles.list}>
            {myDonations.length === 0 ? (
              <p style={styles.emptyMessage}>You have not listed donations yet.</p>
            ) : (
              myDonations.map((donation) => (
                <div key={donation.id} style={styles.item}>
                  <h3 style={styles.itemTitle}>{donation.title}</h3>
                  <div style={styles.itemMeta}>
                    <span>{donation.category}</span>
                    <span>Qty {donation.quantity}</span>
                    <span>{donation.location || 'N/A'}</span>
                    <span>{donation.priority}</span>
                    <span>{donation.status}</span>
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
  backButton: { backgroundColor: '#dcfce7', color: '#166534', padding: '0.45rem 0.8rem', borderRadius: '0.6rem', border: '1px solid #86efac', cursor: 'pointer', fontWeight: '700' },
  headerTitle: { fontSize: '1.4rem', fontWeight: '900', color: '#0f172a' },
  headerSubtitle: { fontSize: '0.88rem', color: '#64748b' },
  headerRight: { textAlign: 'right' },
  userName: { fontWeight: '700', color: '#0f172a' },
  userEmail: { fontSize: '0.82rem', color: '#64748b' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.75rem' },
  statCard: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.95rem', padding: '0.9rem', boxShadow: '0 16px 28px -26px rgba(15, 23, 42, 0.45)' },
  statLabel: { color: '#64748b', fontSize: '0.82rem', marginBottom: '0.2rem' },
  statValue: { fontSize: '1.7rem', fontWeight: '900', color: '#15803d' },
  card: { padding: '1.2rem' },
  cardTitle: { fontSize: '1.18rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.8rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  formRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.75rem' },
  formGroup: { display: 'flex', flexDirection: 'column' },
  label: { marginBottom: '0.34rem', fontWeight: '700', fontSize: '0.84rem', color: '#334155' },
  input: { width: '100%', borderRadius: '0.68rem', padding: '0.62rem 0.8rem', border: '1px solid #cbd5e1', fontSize: '0.92rem', backgroundColor: '#ffffff', color: '#0f172a' },
  successMessage: { backgroundColor: '#dcfce7', color: '#166534', textAlign: 'center', padding: '0.48rem 0.7rem', borderRadius: '0.58rem', border: '1px solid #86efac' },
  submitButton: { width: '100%', borderRadius: '0.68rem', padding: '0.7rem', fontWeight: '700', backgroundColor: '#16a34a', color: 'white', border: '1px solid #15803d', cursor: 'pointer' },
  list: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  emptyMessage: { color: '#64748b', textAlign: 'center', padding: '1.2rem' },
  item: { padding: '0.85rem', borderRadius: '0.75rem', backgroundColor: '#f0fdf4', border: '1px solid #86efac' },
  itemTitle: { fontWeight: '700', color: '#0f172a', fontSize: '1rem' },
  itemMeta: { display: 'flex', gap: '0.6rem', marginTop: '0.45rem', fontSize: '0.8rem', color: '#64748b', flexWrap: 'wrap' }
};

export default DonorDashboard;
