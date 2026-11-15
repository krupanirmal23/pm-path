import { useEffect, useRef, useState } from 'react';

/** Wall-clock based stopwatch, accurate even when the tab is throttled. */
export function useStopwatch() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // ms
  const startRef = useRef<number | null>(null);
  const baseRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed(baseRef.current + (Date.now() - (startRef.current ?? Date.now()))), 250);
    return () => clearInterval(t);
  }, [running]);

  return {
    running,
    elapsed,
    start() {
      if (running) return;
      startRef.current = Date.now();
      setRunning(true);
    },
    pause() {
      if (!running) return;
      baseRef.current += Date.now() - (startRef.current ?? Date.now());
      setElapsed(baseRef.current);
      setRunning(false);
    },
    reset() {
      baseRef.current = 0;
      startRef.current = null;
      setElapsed(0);
      setRunning(false);
    },
  };
}

export function fmt(ms: number): string {
  const neg = ms < 0;
  const s = Math.floor(Math.abs(ms) / 1000);
  const m = Math.floor(s / 60);
  return `${neg ? '-' : ''}${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
