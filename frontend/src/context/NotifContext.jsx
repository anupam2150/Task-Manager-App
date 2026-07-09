import { createContext, useContext, useState, useCallback } from 'react';

const NotifContext = createContext(null);

export function NotifProvider({ children }) {
  const [notifs, setNotifs] = useState([]);

  const push = useCallback((message, type = 'info') => {
    const id = Date.now();
    setNotifs(n => [...n, { id, message, type }]);
    setTimeout(() => setNotifs(n => n.filter(x => x.id !== id)), 4000);
  }, []);

  const dismiss = useCallback((id) => setNotifs(n => n.filter(x => x.id !== id)), []);

  return (
    <NotifContext.Provider value={{ push }}>
      {children}
      <div className="notif-container">
        {notifs.map(n => (
          <div key={n.id} className={`notif notif-${n.type}`}>
            <span>{n.message}</span>
            <button onClick={() => dismiss(n.id)}>✕</button>
          </div>
        ))}
      </div>
    </NotifContext.Provider>
  );
}

export const useNotif = () => useContext(NotifContext);
