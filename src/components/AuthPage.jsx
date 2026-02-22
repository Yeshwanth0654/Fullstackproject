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
      // Login
      const users = getFromStorage(STORAGE_KEYS.USERS);
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Signup
      const users = getFromStorage(STORAGE_KEYS.USERS);
      
      if (users.find(u => u.email === formData.email)) {
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
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h1 style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p style={styles.subtitle}>
          {isLogin ? 'Login to access your dashboard' : 'Sign up to get started'}
        </p>

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
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={styles.input}
                  placeholder="Enter your full name"
                  className="focus-outline"
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="role" style={styles.label}>I am a...</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  style={styles.input}
                  className="focus-outline"
                >
                  <option value="donor">🎁 Donor - I want to donate items</option>
                  <option value="recipient">🤝 Recipient - I need assistance</option>
                  <option value="logistics">🚚 Logistics - I coordinate deliveries</option>
                  <option value="admin">⚙️ Admin - Platform administrator</option>
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
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={styles.input}
              placeholder="your@email.com"
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
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={styles.input}
              placeholder="Enter your password"
              className="focus-outline"
            />
          </div>

          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={styles.submitButton}
            className="focus-outline"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
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
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1rem'
  },
  formCard: {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '1rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '28rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#374151'
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    transition: 'border-color 0.2s'
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    textAlign: 'center',
    fontSize: '0.875rem'
  },
  submitButton: {
    width: '100%',
    padding: '0.875rem',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  toggleText: {
    textAlign: 'center',
    marginTop: '1.5rem',
    color: '#6b7280'
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: 0
  }
};

export default AuthPage;