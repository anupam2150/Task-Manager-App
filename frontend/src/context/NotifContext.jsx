import { createContext, useContext, useState, useCallback } from 'react';

const NotifContext = createContext(null);

const ICONS = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
const DURATION = 4000;

export function NotifProvider({ children }) {
  const [notifs, setNotifs] = useState([]);

  const push = useCallback((message, type = 'info') => {
    const id = Date.now();
    setNotifs(n => [...n, { id, message, type, exiting: false }]);
    setTimeout(() => {
      setNotifs(n => n.map(x => x.id === id ? { ...x, exiting: true } : x));
      setTimeout(() => setNotifs(n => n.filter(x => x.id !== id)), 350);
    }, DURATION);
  }, []);

  const dismiss = useCallback((id) => {
    setNotifs(n => n.map(x => x.id === id ? { ...x, exiting: true } : x));
    setTimeout(() => setNotifs(n => n.filter(x => x.id !== id)), 350);
  }, []);

  return (
    <NotifContext.Provider value={{ push }}>
      {children}
      <div className="notif-container">
        {notifs.map(n => (
          <div key={n.id} className={`notif notif-${n.type}${n.exiting ? ' notif-exit' : ''}`}>
            <span className="notif-icon">{ICONS[n.type] ?? ICONS.info}</span>
            <span className="notif-message">{n.message}</span>
            <button className="notif-close" onClick={() => dismiss(n.id)}>✕</button>
            <div className="notif-progress" />
          </div>
        ))}
      </div>
    </NotifContext.Provider>
  );
}

export const useNotif = () => useContext(NotifContext); // eslint-disable-line react-refresh/only-export-components
