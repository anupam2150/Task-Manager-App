import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

const osPrefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : osPrefersDark();
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Sync with OS changes when no manual preference is saved
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!localStorage.getItem('theme')) setDark(e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => {
      const next = !dark;
      setDark(next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
    }}}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
