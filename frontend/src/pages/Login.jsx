import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === 'string') setError(data);
      else setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-logo">✓</div>
          <h1>TaskManager</h1>
          <p>Organize your projects and tasks efficiently with a beautiful kanban board.</p>
        </div>
        <div className="auth-right">
          <h2>Welcome back</h2>
          <p className="subtitle">Sign in to your account to continue</p>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input placeholder="Email address" type="email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required />
            <input placeholder="Password" type="password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} required />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="switch-link">Don't have an account? <Link to="/register">Create one</Link></p>
        </div>
      </div>
    </div>
  );
}
