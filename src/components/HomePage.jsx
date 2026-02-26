import React from 'react';

function HomePage({ onNavigate }) {
  return (
    <div style={styles.container} className="ui-shell">
      <div style={styles.content} className="ui-wrap">
        <div style={styles.heroBlock} className="ui-panel fade-in">
          <p style={styles.eyebrow}>Emergency Support Platform</p>
          <h1 style={styles.title} className="page-title">Relief Donation Hub</h1>
          <div style={styles.heroActions}>
            <button
              onClick={() => onNavigate('auth')}
              style={styles.ctaButton}
              className="focus-outline"
            >
              Enter Platform
            </button>
          </div>
        </div>

        <div style={styles.grid}>
          <div style={styles.card} className="slide-in">
            <div style={styles.icon}>Admin</div>
            <h3 style={styles.cardTitle}>Admin</h3>
            <p style={styles.cardText}>Launch drives, prioritize categories, and monitor live demand signals.</p>
          </div>
          <div style={{ ...styles.card, animationDelay: '0.1s' }} className="slide-in">
            <div style={styles.icon}>Donor</div>
            <h3 style={styles.cardTitle}>Donor</h3>
            <p style={styles.cardText}>List available inventory and route contributions where urgency is highest.</p>
          </div>
          <div style={{ ...styles.card, animationDelay: '0.2s' }} className="slide-in">
            <div style={styles.icon}>Recipient</div>
            <h3 style={styles.cardTitle}>Recipient</h3>
            <p style={styles.cardText}>Submit requests with context and keep visibility on fulfillment progress.</p>
          </div>
          <div style={{ ...styles.card, animationDelay: '0.3s' }} className="slide-in">
            <div style={styles.icon}>Logistics</div>
            <h3 style={styles.cardTitle}>Logistics</h3>
            <p style={styles.cardText}>Track shipments and update the last-mile status in one dashboard.</p>
          </div>
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
    display: 'flex',
    flexDirection: 'column',
    gap: '1.4rem'
  },
  heroBlock: {
    padding: '2rem 2rem 2.2rem',
    textAlign: 'left'
  },
  eyebrow: {
    textTransform: 'uppercase',
    fontSize: '0.78rem',
    fontWeight: '800',
    letterSpacing: '0.1em',
    color: '#1d4ed8',
    marginBottom: '0.7rem'
  },
  title: {
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: '0.7rem'
  },
  heroActions: {
    marginTop: '1.4rem',
    display: 'flex',
    gap: '0.7rem',
    flexWrap: 'wrap'
  },
  ctaButton: {
    backgroundColor: '#1d4ed8',
    color: 'white',
    padding: '0.76rem 1.25rem',
    borderRadius: '0.85rem',
    fontSize: '0.98rem',
    fontWeight: '700',
    border: '1px solid #1e40af',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem'
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    padding: '1.2rem',
    borderRadius: '1rem',
    border: '1px solid #dbe4f0',
    boxShadow: '0 18px 28px -24px rgba(15, 23, 42, 0.45)'
  },
  icon: {
    display: 'inline-flex',
    padding: '0.36rem 0.75rem',
    fontSize: '0.74rem',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    fontWeight: '800',
    borderRadius: '999px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    marginBottom: '0.7rem'
  },
  cardTitle: {
    fontSize: '1.15rem',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '0.4rem'
  },
  cardText: {
    color: '#475569',
    fontSize: '0.94rem'
  }
};

export default HomePage;
