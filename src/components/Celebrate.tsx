import { useEffect, useMemo, useState } from 'react';

const COLORS = ['#D9CCF5', '#FFD6E0', '#CFE6FF', '#CDEFD9', '#FFF1B8', '#FFDCC2'];

/** A small confetti burst + “DONE” stamp. Disappears after ~2.4s. Respects reduced motion via CSS. */
export function Celebrate({ label, onDone }: { label: string; onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pieces = useMemo(
    () =>
      Array.from({ length: reduced ? 0 : 36 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 520,
        y: -(Math.random() * 300 + 120),
        r: Math.random() * 540 - 270,
        c: COLORS[i % COLORS.length],
        d: Math.random() * 120,
      })),
    [reduced],
  );
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDone();
    }, 2400);
    return () => clearTimeout(t);
  }, [onDone]);
  if (!visible) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-50 grid place-items-center" role="status" aria-live="polite">
      <style>{`
        @keyframes cf { 0% { transform: translate(0,0) rotate(0); opacity: 1 } 100% { transform: translate(var(--x), calc(var(--y) * -1 + 380px)) rotate(var(--r)); opacity: 0 } }
        @keyframes cfup { 0% { transform: translate(0,0) } 100% { transform: translate(calc(var(--x) * .6), var(--y)) } }
      `}</style>
      <div className="relative">
        {pieces.map((p) => (
          <span
            key={p.id}
            className="absolute left-1/2 top-1/2 block h-3 w-2 border border-[#1E1E24]"
            style={
              {
                background: p.c,
                '--x': `${p.x}px`,
                '--y': `${p.y}px`,
                '--r': `${p.r}deg`,
                animation: `cf 1.6s ${p.d}ms cubic-bezier(.2,.7,.4,1) both`,
              } as React.CSSProperties
            }
          />
        ))}
        <div className="stamp nb-card bg-pink px-8 py-4 text-center" style={{ boxShadow: '6px 6px 0 #1E1E24', borderWidth: 3, color: '#1E1E24' }}>
          <div className="font-display text-4xl font-bold tracking-wider">DONE!</div>
          <div className="font-display text-sm font-semibold">{label}</div>
        </div>
      </div>
    </div>
  );
}
