import React from 'react';

function RoleSelectionPage({ user, onSelectRole }) {
  const allRoles = [
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage donation drives and platform operations',
      color: '#f59e0b',
      bgColor: '#fffbeb'
    },
    {
      id: 'donor',
      title: 'Donor',
      description: 'List donations and track contributions',
      color: '#16a34a',
      bgColor: '#f0fdf4'
    },
    {
      id: 'recipient',
      title: 'Recipient',
      description: 'Request essentials and track deliveries',
      color: '#dc2626',
      bgColor: '#fef2f2'
    },
    {
      id: 'logistics',
      title: 'Logistics',
      description: 'Coordinate deliveries and manage inventory',
      color: '#2563eb',
      bgColor: '#eff6ff'
    }
  ];

  const availableRoles = user.role === 'admin' ? allRoles : allRoles.filter((role) => role.id !== 'admin');

  return (
    <div style={styles.container} className="ui-shell">
      <div style={styles.wrap} className="ui-wrap">
        <header style={styles.header} className="ui-panel">
          <h1 style={styles.headerTitle}>Welcome, {user.name}</h1>
          <p style={styles.headerSubtitle}>{user.role === 'admin' ? 'You have access to every dashboard view.' : 'Select the workspace you want to open.'}</p>
        </header>

        {user.role === 'admin' && <div style={styles.adminBadge}>Administrator mode enabled</div>}

        <div style={styles.rolesGrid}>
          {availableRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              style={{ ...styles.roleCard, backgroundColor: role.bgColor, borderTop: `4px solid ${role.color}` }}
              className="focus-outline"
            >
              <div style={{ ...styles.roleTag, color: role.color, borderColor: role.color }}>{role.title}</div>
              <h2 style={{ ...styles.roleTitle, color: role.color }}>{role.title} Dashboard</h2>
              <p style={styles.roleDescription}>{role.description}</p>
              <div style={{ ...styles.accessButton, backgroundColor: role.color }}>Open Workspace</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh'
  },
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  header: {
    padding: '1.3rem 1.4rem'
  },
  headerTitle: {
    fontSize: '2rem',
    fontWeight: '900',
    color: '#0f172a'
  },
  headerSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    marginTop: '0.25rem'
  },
  adminBadge: {
    alignSelf: 'start',
    backgroundColor: '#fffbeb',
    color: '#92400e',
    padding: '0.65rem 0.95rem',
    borderRadius: '999px',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '0.86rem',
    border: '1px solid #fcd34d'
  },
  rolesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem'
  },
  roleCard: {
    padding: '1.2rem',
    borderRadius: '1rem',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 20px 35px -30px rgba(15, 23, 42, 0.45)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.7rem'
  },
  roleTag: {
    alignSelf: 'start',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: '800',
    border: '1px solid',
    borderRadius: '999px',
    padding: '0.2rem 0.55rem'
  },
  roleTitle: {
    fontSize: '1.3rem',
    fontWeight: '900',
    margin: 0
  },
  roleDescription: {
    color: '#334155',
    fontSize: '0.94rem',
    lineHeight: '1.5',
    margin: 0
  },
  accessButton: {
    marginTop: '0.25rem',
    alignSelf: 'start',
    padding: '0.52rem 0.85rem',
    borderRadius: '0.65rem',
    color: 'white',
    fontWeight: '700',
    fontSize: '0.84rem'
  }
};

export default RoleSelectionPage;
