import { useState } from 'react';
import './App.css';
import NavigationHeader from './components/NavigationHeader';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import AuthPage from './components/AuthPage';
import RoleSelectionPage from './components/RoleSelectionPage';
import AdminDashboard from './components/AdminDashboard';
import DonorDashboard from './components/DonorDashboard';
import RecipientDashboard from './components/RecipientDashboard';
import LogisticsDashboard from './components/LogisticsDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === 'home') {
      setSelectedRole(null);
    }
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage('roleSelection');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedRole(null);
    setCurrentPage('home');
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setCurrentPage('dashboard');
  };

  const handleBack = () => {
    setSelectedRole(null);
    setCurrentPage('roleSelection');
  };

  const showNavigation = currentPage !== 'auth' && currentPage !== 'dashboard';

  return (
    <div className="app-container">
      {showNavigation && (
        <NavigationHeader 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          user={currentUser}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'auth' && <AuthPage onLogin={handleLogin} />}
      {currentPage === 'roleSelection' && (
        <RoleSelectionPage 
          user={currentUser} 
          onSelectRole={handleSelectRole}
        />
      )}
      {currentPage === 'dashboard' && selectedRole === 'admin' && (
        <AdminDashboard user={currentUser} onBack={handleBack} />
      )}
      {currentPage === 'dashboard' && selectedRole === 'donor' && (
        <DonorDashboard user={currentUser} onBack={handleBack} />
      )}
      {currentPage === 'dashboard' && selectedRole === 'recipient' && (
        <RecipientDashboard user={currentUser} onBack={handleBack} />
      )}
      {currentPage === 'dashboard' && selectedRole === 'logistics' && (
        <LogisticsDashboard user={currentUser} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;