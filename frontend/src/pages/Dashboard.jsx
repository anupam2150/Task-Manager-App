import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const STAT_COLORS = {
  totalProjects: '#6366f1', totalTasks: '#0ea5e9',
  done: '#10b981', inProgress: '#f59e0b',
  todo: '#94a3b8', overdue: '#ef4444',
  dueSoon: '#f97316', highPriority: '#8b5cf6'
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/dashboard').then(({ data }) => {
      setStats(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="page"><p className="loading">Loading dashboard...</p></div>;
  if (!stats) return null;

  const statCards = [
    { label: 'Projects', value: stats.totalProjects, icon: '📁', key: 'totalProjects' },
    { label: 'Total Tasks', value: stats.totalTasks, icon: '📋', key: 'totalTasks' },
    { label: 'Completed', value: stats.done, icon: '✅', key: 'done' },
    { label: 'In Progress', value: stats.inProgress, icon: '⏳', key: 'inProgress' },
    { label: 'To Do', value: stats.todo, icon: '📝', key: 'todo' },
    { label: 'Overdue', value: stats.overdue, icon: '🚨', key: 'overdue' },
    { label: 'Due Soon', value: stats.dueSoon, icon: '⚠️', key: 'dueSoon' },
    { label: 'High Priority', value: stats.highPriority, icon: '🔥', key: 'highPriority' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h2>📊 Dashboard</h2>
      </div>

      <div className="dashboard-grid">
        {statCards.map(s => (
          <div key={s.key} className="stat-card" style={{ borderTopColor: STAT_COLORS[s.key] }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-bottom">
        <div className="completion-card">
          <h3>Overall Completion</h3>
          <div className="progress-bar-wrap">
            <div className="progress-bar" style={{ width: `${stats.completionRate}%` }} />
          </div>
          <span className="progress-label">{stats.completionRate}% complete</span>
        </div>

        <div className="recent-card">
          <h3>Recent Tasks</h3>
          {stats.recentTasks.length === 0 ? (
            <p className="empty-col">No tasks yet</p>
          ) : (
            <ul className="recent-list">
              {stats.recentTasks.map(t => (
                <li key={t.id} className="recent-item" onClick={() => navigate(`/projects/${t.projectId}`)}>
                  <span className={`badge ${t.priority.toLowerCase()}`}>{t.priority}</span>
                  <span className="recent-title">{t.title}</span>
                  <span className={`status-chip status-${t.status.toLowerCase()}`}>{t.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
