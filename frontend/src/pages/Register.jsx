import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const extractError = (err) => {
  const data = err.response?.data;
  if (!data) return 'Registration failed. Please check your connection and try again.';
  if (typeof data === 'string') return data;
  if (data.errors) return Object.values(data.errors).flat().join(' ');
  if (data.title) return data.title;
  return 'Registration failed. Please try again.';
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await register(form.username, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(extractError(err));
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
          <p>Create an account and start managing your projects and tasks today.</p>
        </div>
        <div className="auth-right">
          <h2>Create account</h2>
          <p className="subtitle">Fill in the details below to get started</p>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input placeholder="Username (3-50 characters)" value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })} required />
            <input placeholder="Email address" type="email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required />
            <input placeholder="Password" type="password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} required />
            <small className="hint">Min 8 chars with uppercase, lowercase, digit & special character (e.g. Test@1234)</small>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="switch-link">Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
