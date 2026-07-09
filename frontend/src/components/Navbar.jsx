import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          <div className="brand-icon">✓</div>
          TaskManager
        </Link>
        {user && (
          <div className="nav-links">
            <Link to="/" className="nav-link">Projects</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </div>
        )}
      </div>
      {user && (
        <div className="nav-right">
          <button className="theme-toggle" onClick={toggle} title="Toggle dark mode">
            {dark ? '☀️' : '🌙'}
          </button>
          <div className="avatar">{user.username?.charAt(0).toUpperCase()}</div>
          <span className="nav-username">{user.username}</span>
          <button className="nav-logout" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}
