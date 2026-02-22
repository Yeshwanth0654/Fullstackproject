import React, { useState } from 'react';
import { STORAGE_KEYS, saveToStorage, getFromStorage } from '../utils/storage';

function AdminDashboard({ user, onBack }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'food',
    location: '',
    priority: 'high'
  });
  const [message, setMessage] = useState('');

  const drives = getFromStorage(STORAGE_KEYS.DRIVES);
  const donations = getFromStorage(STORAGE_KEYS.DONATIONS);
  const requests = getFromStorage(STORAGE_KEYS.REQUESTS);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDrive = {
      ...formData,
      id: Date.now(),
      status: 'active',
      created_by: user.email,
      created_at: new Date().toISOString()
    };
    const allDrives = getFromStorage(STORAGE_KEYS.DRIVES);
    allDrives.push(newDrive);
    saveToStorage(STORAGE_KEYS.DRIVES, allDrives);
    setMessage('Drive created successfully!');
    setFormData({ title: '', description: '', category: 'food', location: '', priority: 'high' });
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
              <h1 style={styles.headerTitle}>Admin Dashboard</h1>
              <p style={styles.headerSubtitle}>Manage donation drives and platform operations</p>
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
          <div style={{...styles.statCard, borderLeft: '4px solid #f59e0b'}}>
            <p style={styles.statLabel}>Active Drives</p>
            <p style={{...styles.statValue, color: '#f59e0b'}}>{drives.length}</p>
          </div>
          <div style={{...styles.statCard, borderLeft: '4px solid #10b981'}}>
            <p style={styles.statLabel}>Total Donations</p>
            <p style={{...styles.statValue, color: '#10b981'}}>{donations.length}</p>
          </div>
          <div style={{...styles.statCard, borderLeft: '4px solid #ef4444'}}>
            <p style={styles.statLabel}>Open Requests</p>
            <p style={{...styles.statValue, color: '#ef4444'}}>{requests.length}</p>
          </div>
        </div>

        {/* Create Drive Form */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Create New Donation Drive</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="title" style={styles.label}>Drive Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  style={styles.input}
                  placeholder="e.g. Flood Relief - Food & Clothing"
                  className="focus-outline"
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="location" style={styles.label}>Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  style={styles.input}
                  placeholder="City / Region"
                  className="focus-outline"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="description" style={styles.label}>Description</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                style={{...styles.input, resize: 'none'}}
                placeholder="Describe the emergency and what's needed most"
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
                <label htmlFor="priority" style={styles.label}>Priority Level</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  style={styles.input}
                  className="focus-outline"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
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
              Create Drive
            </button>
          </form>
        </div>

        {/* Recent Drives */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Recent Drives</h2>
          <div style={styles.drivesList}>
            {drives.length === 0 ? (
              <p style={styles.emptyMessage}>
                No drives created yet. Create your first drive above!
              </p>
            ) : (
              drives.slice(0, 5).map((drive) => (
                <div 
                  key={drive.id}
                  style={styles.driveItem}
                >
                  <h3 style={styles.driveTitle}>{drive.title}</h3>
                  <p style={styles.driveDescription}>{drive.description}</p>
                  <div style={styles.driveMeta}>
                    <span>📍 {drive.location || 'N/A'}</span>
                    <span>📦 {drive.category}</span>
                    <span style={drive.priority === 'high' ? {fontWeight: '600'} : {}}>
                      {drive.priority === 'high' ? '🔴' : drive.priority === 'medium' ? '🟡' : '🟢'} {drive.priority}
                    </span>
                  </div>
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
    background: 'linear-gradient(to bottom right, #fff7ed, #fefce8)'
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    borderBottom: '4px solid #f59e0b'
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
    backgroundColor: '#fed7aa',
    color: '#ea580c',
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
    color: '#ea580c'
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
    border: '2px solid #fed7aa',
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
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  drivesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  emptyMessage: {
    color: '#4b5563',
    textAlign: 'center',
    padding: '2rem'
  },
  driveItem: {
    padding: '1rem',
    borderRadius: '0.75rem',
    backgroundColor: '#fff7ed',
    borderLeft: '4px solid #f59e0b'
  },
  driveTitle: {
    fontWeight: '600',
    color: '#1f2937',
    fontSize: '1.125rem'
  },
  driveDescription: {
    color: '#4b5563',
    marginTop: '0.25rem'
  },
  driveMeta: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    color: '#4b5563'
  }
};

export default AdminDashboard;