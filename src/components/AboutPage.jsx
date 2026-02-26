import React from 'react';

function AboutPage() {
  return (
    <div style={styles.container} className="ui-shell">
      <div style={styles.content} className="ui-wrap">
        <h1 style={styles.title} className="page-title fade-in">About Relief Hub</h1>
        <div style={styles.card} className="section-card fade-in">
          <p style={styles.text}>
            Relief Donation Hub is built to run emergency coordination as one connected operation.
            The platform links donors, recipients, admins, and logistics teams through a single real-time workflow.
          </p>
          <h2 style={styles.sectionTitle}>Mission</h2>
          <p style={styles.text}>
            Make aid distribution transparent, trackable, and fast so urgent resources reach affected communities with less delay.
          </p>
          <h2 style={styles.sectionTitle}>How The System Works</h2>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.badge}>Admin</span>
              <div><strong>Platform control:</strong> creates drives, monitors demand, and keeps response priorities updated.</div>
            </li>
            <li style={styles.listItem}>
              <span style={styles.badge}>Donor</span>
              <div><strong>Supply source:</strong> publishes available items and contributes inventory to active requests.</div>
            </li>
            <li style={styles.listItem}>
              <span style={styles.badge}>Recipient</span>
              <div><strong>Need signal:</strong> requests essentials and tracks request status as operations progress.</div>
            </li>
            <li style={styles.listItem}>
              <span style={styles.badge}>Logistics</span>
              <div><strong>Delivery engine:</strong> coordinates shipment movement and closes fulfillment updates.</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh'
  },
  content: {
    maxWidth: '64rem',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  title: {
    fontWeight: '900',
    color: '#0f172a'
  },
  card: {
    padding: '1.75rem'
  },
  text: {
    fontSize: '1.02rem',
    color: '#334155',
    lineHeight: '1.72',
    marginBottom: '1.1rem'
  },
  sectionTitle: {
    fontSize: '1.15rem',
    fontWeight: '800',
    color: '#1e3a8a',
    marginTop: '1rem',
    marginBottom: '0.75rem'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  listItem: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'start',
    gap: '0.8rem',
    color: '#334155',
    fontSize: '0.95rem'
  },
  badge: {
    display: 'inline-flex',
    backgroundColor: '#e2e8f0',
    color: '#0f172a',
    borderRadius: '999px',
    padding: '0.28rem 0.64rem',
    fontSize: '0.72rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.06em'
  }
};

export default AboutPage;
