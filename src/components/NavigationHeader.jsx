import React from 'react';

function NavigationHeader({ currentPage, onNavigate, user, onLogout }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.leftSection}>
          <h1 style={styles.logo}>Relief Hub</h1>
          <span style={styles.tagline}>Crisis Response Network</span>
        </div>
        <div style={styles.rightSection}>
          <button
            onClick={() => onNavigate('home')}
            style={{
              ...styles.navButton,
              ...(currentPage === 'home' ? styles.activeNavButton : null)
            }}
            className="focus-outline"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('about')}
            style={{
              ...styles.navButton,
              ...(currentPage === 'about' ? styles.activeNavButton : null)
            }}
            className="focus-outline"
          >
            About
          </button>
          <button
            onClick={() => onNavigate('contact')}
            style={{
              ...styles.navButton,
              ...(currentPage === 'contact' ? styles.activeNavButton : null)
            }}
            className="focus-outline"
          >
            Contact Us
          </button>
          {user && (
            <>
              <span style={styles.userName}>Welcome, {user.name}</span>
              <button
                onClick={onLogout}
                style={styles.logoutButton}
                className="focus-outline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottom: '1px solid #e2e8f0',
    backdropFilter: 'blur(8px)',
    padding: '0.85rem 1.5rem'
  },
  container: {
    maxWidth: '80rem',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem'
  },
  logo: {
    fontSize: '1.35rem',
    fontWeight: '800',
    letterSpacing: '0.01em',
    color: '#0f172a'
  },
  tagline: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#1d4ed8',
    padding: '0.25rem 0.65rem',
    borderRadius: '999px',
    backgroundColor: '#dbeafe'
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  navButton: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    color: '#334155',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '0.94rem',
    padding: '0.42rem 0.82rem',
    borderRadius: '999px'
  },
  activeNavButton: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    border: '1px solid #93c5fd'
  },
  userName: {
    color: '#0f172a',
    fontWeight: '600',
    marginLeft: '0.35rem'
  },
  logoutButton: {
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '0.45rem 0.9rem',
    borderRadius: '999px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '700',
    transition: 'background-color 0.2s'
  }
};

export default NavigationHeader;
