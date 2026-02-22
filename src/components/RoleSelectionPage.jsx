import React from 'react';

function RoleSelectionPage({ user, onSelectRole, onLogout }) {
  const allRoles = [
    {
      id: 'admin',
      title: 'Admin',
      icon: '⚙️',
      description: 'Manage donation drives and platform operations',
      color: '#f59e0b',
      bgColor: '#fff7ed'
    },
    {
      id: 'donor',
      title: 'Donor',
      icon: '🎁',
      description: 'List donations and track contributions',
      color: '#10b981',
      bgColor: '#f0fdf4'
    },
    {
      id: 'recipient',
      title: 'Recipient',
      icon: '🤝',
      description: 'Request essentials and track deliveries',
      color: '#ef4444',
      bgColor: '#fef2f2'
    },
    {
      id: 'logistics',
      title: 'Logistics',
      icon: '🚚',
      description: 'Coordinate deliveries and manage inventory',
      color: '#3b82f6',
      bgColor: '#eff6ff'
    }
  ];

  // Filter roles based on user's role
  const availableRoles = user.role === 'admin' 
    ? allRoles // Admin can access all dashboards
    : allRoles.filter(role => role.id !== 'admin'); // Others cannot access admin

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.headerTitle}>Welcome, {user.name}!</h1>
            <p style={styles.headerSubtitle}>
              {user.role === 'admin' 
                ? 'You have full access to all dashboards' 
                : 'Choose a dashboard to access'}
            </p>
          </div>
         
        </div>
      </header>

      <main style={styles.main}>
        {user.role === 'admin' && (
          <div style={styles.adminBadge}>
            ⚙️ Administrator Access - Full Platform Control
          </div>
        )}

        <div style={styles.rolesGrid}>
          {availableRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              style={{
                ...styles.roleCard,
                backgroundColor: role.bgColor,
                borderLeft: `6px solid ${role.color}`
              }}
              className="focus-outline"
            >
              <div style={styles.roleIcon}>{role.icon}</div>
              <h2 style={{...styles.roleTitle, color: role.color}}>{role.title}</h2>
              <p style={styles.roleDescription}>{role.description}</p>
              <div style={{...styles.accessButton, backgroundColor: role.color}}>
                Access Dashboard →
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    padding: '1.5rem'
  },
  headerContent: {
    maxWidth: '80rem',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  headerTitle: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1f2937'
  },
  headerSubtitle: {
    fontSize: '1rem',
    color: '#6b7280',
    marginTop: '0.25rem'
  },
  logoutButton: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '0.625rem 1.25rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.2s'
  },
  main: {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '3rem 1.5rem'
  },
  adminBadge: {
    backgroundColor: '#fff7ed',
    color: '#ea580c',
    padding: '1rem 1.5rem',
    borderRadius: '0.75rem',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '1.1rem',
    marginBottom: '2rem',
    border: '2px solid #f59e0b',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  rolesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem'
  },
  roleCard: {
    padding: '2rem',
    borderRadius: '1rem',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem'
  },
  roleIcon: {
    fontSize: '3.5rem',
    marginBottom: '0.5rem'
  },
  roleTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0
  },
  roleDescription: {
    color: '#4b5563',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    margin: 0
  },
  accessButton: {
    marginTop: '0.5rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    color: 'white',
    fontWeight: '600',
    fontSize: '0.95rem'
  }
};

export default RoleSelectionPage;