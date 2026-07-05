import { useState, useEffect } from 'react';

/**
 * useTheme — manages dark/light mode for the entire app.
 *
 * Behaviour:
 *  • Reads initial preference from localStorage (or OS prefers-color-scheme).
 *  • Adds/removes the `dark` class on <html> whenever the mode changes.
 *  • Persists the user's choice to localStorage.
 *
 * Usage:
 *   const { isDark, toggleTheme } = useTheme();
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
    } catch {
      // localStorage unavailable (e.g. SSR or private mode edge cases)
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return { isDark, toggleTheme };
}
