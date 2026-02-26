import React, { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div style={styles.container} className="ui-shell">
      <div style={styles.content} className="ui-wrap">
        <h1 style={styles.title} className="page-title fade-in">Contact Operations Desk</h1>
        <div style={styles.grid}>
          <div style={styles.card} className="section-card fade-in">
            <h2 style={styles.cardTitle}>Reach The Team</h2>
            <div style={styles.contactList}>
              <div style={styles.contactItem}><p style={styles.contactLabel}>Email</p><p style={styles.contactValue}>support@reliefhub.org</p></div>
              <div style={styles.contactItem}><p style={styles.contactLabel}>Phone</p><p style={styles.contactValue}>8919910098</p></div>
              <div style={styles.contactItem}><p style={styles.contactLabel}>Address</p><p style={styles.contactValue}>123 Relief Street, City, State 12345</p></div>
              <div style={styles.contactItem}><p style={styles.contactLabel}>Support Window</p><p style={styles.contactValue}>24x7 Emergency Coordination</p></div>
            </div>
          </div>

          <div style={styles.card} className="section-card fade-in">
            <h2 style={styles.cardTitle}>Send A Message</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={styles.input}
                  placeholder="Your name"
                  className="focus-outline"
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email</label>
                <input
                  id="email"
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
                <label htmlFor="subject" style={styles.label}>Subject</label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={styles.input}
                  placeholder="How can we help?"
                  className="focus-outline"
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.label}>Message</label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ ...styles.input, resize: 'none' }}
                  placeholder="Share details"
                  className="focus-outline"
                />
              </div>
              {submitted && <div style={styles.successMessage}>Message sent successfully.</div>}
              <button type="submit" style={styles.submitButton} className="focus-outline">Submit Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh' },
  content: {
    maxWidth: '66rem',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  title: {
    fontWeight: '900',
    color: '#0f172a'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
    gap: '1rem'
  },
  card: { padding: '1.4rem' },
  cardTitle: {
    fontSize: '1.22rem',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '1rem'
  },
  contactList: {
    display: 'grid',
    gap: '0.6rem'
  },
  contactItem: {
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    borderRadius: '0.8rem',
    padding: '0.7rem 0.8rem'
  },
  contactLabel: {
    fontSize: '0.74rem',
    fontWeight: '700',
    color: '#1d4ed8',
    textTransform: 'uppercase',
    letterSpacing: '0.07em'
  },
  contactValue: {
    color: '#334155',
    marginTop: '0.2rem'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  formGroup: { display: 'flex', flexDirection: 'column' },
  label: {
    color: '#334155',
    fontWeight: '700',
    marginBottom: '0.34rem',
    fontSize: '0.86rem'
  },
  input: {
    width: '100%',
    padding: '0.65rem 0.85rem',
    border: '1px solid #cbd5e1',
    borderRadius: '0.7rem',
    fontSize: '0.95rem',
    backgroundColor: '#ffffff',
    color: '#0f172a'
  },
  successMessage: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '0.55rem 0.8rem',
    borderRadius: '0.65rem',
    textAlign: 'center',
    border: '1px solid #86efac'
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#0f172a',
    color: 'white',
    padding: '0.72rem',
    borderRadius: '0.7rem',
    fontWeight: '700',
    border: '1px solid #020617',
    cursor: 'pointer'
  }
};

export default ContactPage;
