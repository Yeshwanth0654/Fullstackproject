import React, { useState } from 'react';
import { STORAGE_KEYS, saveToStorage, getFromStorage } from '../utils/storage';

function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'donor'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const users = getFromStorage(STORAGE_KEYS.USERS);
      const user = users.find((u) => u.email === formData.email && u.password === formData.password);

      if (user) {
        onLogin(user);
      } else {
        setError('Invalid email or password');
      }
    } else {
      const users = getFromStorage(STORAGE_KEYS.USERS);

      if (users.find((u) => u.email === formData.email)) {
        setError('Email already registered');
        return;
      }

      const newUser = {
        id: Date.now(),
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role,
        created_at: new Date().toISOString()
      };

      users.push(newUser);
      saveToStorage(STORAGE_KEYS.USERS, users);
      onLogin(newUser);
    }
  };

  return (
    <div style={styles.container} className="ui-shell">
      <div style={styles.layout} className="ui-wrap">
        <section style={styles.brandPanel} className="ui-panel fade-in">
          <p style={styles.brandLabel}>Relief Hub</p>
          <h1 style={styles.brandTitle}>Coordinate Aid With One Shared System</h1>
          <p style={styles.brandText}>
            Join the network used by operations teams, donors, and recipients to move supplies from source to destination.
          </p>
        </section>

        <section style={styles.formCard} className="section-card fade-in">
          <h2 style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p style={styles.subtitle}>{isLogin ? 'Sign in to continue to your workspace.' : 'Register your profile to access the platform.'}</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            {!isLogin && (
              <>
                <div style={styles.formGroup}>
                  <label htmlFor="name" style={styles.label}>Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={styles.input}
                    placeholder="Enter your full name"
                    className="focus-outline"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="role" style={styles.label}>Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={styles.input}
                    className="focus-outline"
                  >
                    <option value="donor">Donor - I want to donate items</option>
                    <option value="recipient">Recipient - I need assistance</option>
                    <option value="logistics">Logistics - I coordinate deliveries</option>
                    <option value="admin">Admin - Platform administrator</option>
                  </select>
                </div>
              </>
            )}

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={styles.input}
                placeholder="you@example.com"
                className="focus-outline"
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={styles.input}
                placeholder="Enter your password"
                className="focus-outline"
              />
            </div>

            {error && <div style={styles.errorMessage}>{error}</div>}

            <button type="submit" style={styles.submitButton} className="focus-outline">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <p style={styles.toggleText}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ email: '', password: '', name: '', role: 'donor' });
              }}
              style={styles.toggleButton}
              className="focus-outline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </section>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh'
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1rem',
    alignItems: 'stretch'
  },
  brandPanel: {
    padding: '1.8rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  brandLabel: {
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontSize: '0.75rem',
    fontWeight: '800',
    color: '#1d4ed8'
  },
  brandTitle: {
    marginTop: '0.7rem',
    fontSize: '2.05rem',
    lineHeight: 1.08,
    fontWeight: '900',
    color: '#0f172a'
  },
  brandText: {
    marginTop: '0.8rem',
    color: '#475569',
    maxWidth: '32rem'
  },
  formCard: {
    padding: '1.6rem'
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: '900',
    color: '#0f172a'
  },
  subtitle: {
    color: '#64748b',
    marginTop: '0.3rem',
    marginBottom: '1.1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.82rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '0.35rem',
    fontWeight: '700',
    fontSize: '0.85rem',
    color: '#334155'
  },
  input: {
    width: '100%',
    padding: '0.7rem 0.85rem',
    border: '1px solid #cbd5e1',
    borderRadius: '0.72rem',
    fontSize: '0.95rem',
    backgroundColor: '#ffffff',
    color: '#0f172a'
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: '0.65rem',
    borderRadius: '0.65rem',
    textAlign: 'center',
    border: '1px solid #fecaca',
    fontSize: '0.9rem'
  },
  submitButton: {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: '#1d4ed8',
    color: 'white',
    border: '1px solid #1e40af',
    borderRadius: '0.72rem',
    fontSize: '0.95rem',
    fontWeight: '700',
    cursor: 'pointer'
  },
  toggleText: {
    textAlign: 'center',
    marginTop: '1rem',
    color: '#64748b'
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#1d4ed8',
    fontWeight: '700',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: 0
  }
};

export default AuthPage;
