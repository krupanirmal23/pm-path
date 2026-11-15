import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export function applyTheme(theme: 'light' | 'dark' | 'system') {
  const dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#1E1E24' : '#FFF8EE');
}

export function useTheme() {
  const theme = useStore((s) => s.settings.theme);
  useEffect(() => {
    applyTheme(theme);
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const fn = () => applyTheme('system');
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [theme]);
}
