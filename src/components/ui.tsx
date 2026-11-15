import { forwardRef, useId, useState, type ButtonHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { Check, Circle, Loader, OctagonAlert, Lightbulb, TriangleAlert, BookOpen, MessagesSquare } from 'lucide-react';
import type { Pastel, Status } from '../data/types';

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(' ');
}

// ---------- Buttons ----------
type BtnVariant = 'primary' | 'default' | 'ghost' | 'danger';
interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  size?: 'sm' | 'md';
  color?: Pastel;
}
export const Button = forwardRef<HTMLButtonElement, BtnProps>(function Button({ variant = 'default', size = 'md', color, className, type = 'button', ...rest }, ref) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx('nb-btn', variant === 'primary' && 'nb-btn-primary', variant === 'ghost' && 'nb-btn-ghost', variant === 'danger' && 'nb-btn-danger', size === 'sm' && 'nb-btn-sm', color && `bg-${color}`, className)}
      {...rest}
    />
  );
});

export function LinkButton({ to, children, variant = 'default', size = 'md', className, color }: { to: string; children: ReactNode; variant?: BtnVariant; size?: 'sm' | 'md'; className?: string; color?: Pastel }) {
  return (
    <Link to={to} className={cx('nb-btn', variant === 'primary' && 'nb-btn-primary', variant === 'ghost' && 'nb-btn-ghost', size === 'sm' && 'nb-btn-sm', color && `bg-${color}`, className)}>
      {children}
    </Link>
  );
}

// ---------- Card ----------
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  color?: Pastel;
  hover?: boolean;
  as?: 'div' | 'section' | 'article';
}
export function Card({ color, hover, className, as: As = 'div', ...rest }: CardProps) {
  return <As className={cx('nb-card', hover && 'nb-card-hover', color && `bg-${color}`, className)} {...rest} />;
}

export function CardTitle({ children, icon, className }: { children: ReactNode; icon?: ReactNode; className?: string }) {
  return (
    <h3 className={cx('flex items-center gap-2 text-base font-bold', className)}>
      {icon}
      {children}
    </h3>
  );
}

// ---------- Chips ----------
export function Chip({ children, color, className, title }: { children: ReactNode; color?: Pastel; className?: string; title?: string }) {
  return (
    <span title={title} className={cx('nb-chip', color && `bg-${color}`, className)}>
      {children}
    </span>
  );
}

const STATUS_META: Record<Status, { label: string; color?: Pastel; icon: ReactNode }> = {
  done: { label: 'Done', color: 'mint', icon: <Check size={13} strokeWidth={3} aria-hidden /> },
  in_progress: { label: 'In progress', color: 'butter', icon: <Loader size={13} strokeWidth={3} aria-hidden /> },
  not_started: { label: 'Not started', icon: <Circle size={13} strokeWidth={3} aria-hidden /> },
  blocked: { label: 'Blocked', color: 'pink', icon: <OctagonAlert size={13} strokeWidth={3} aria-hidden /> },
};
export function StatusChip({ status, label }: { status: Status; label?: string }) {
  const m = STATUS_META[status];
  return (
    <Chip color={m.color}>
      {m.icon}
      {label ?? m.label}
    </Chip>
  );
}
export const statusLabel = (s: Status) => STATUS_META[s].label;

// ---------- Progress ----------
export function ProgressBar({ value, color = 'mint', label, className }: { value: number; color?: Pastel; label?: string; className?: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={cx('nb-progress', className)} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(v)} aria-label={label ?? 'Progress'}>
      <span className={`bg-${color}`} style={{ width: `${v}%`, borderRightWidth: v === 0 || v === 100 ? 0 : 2 }} />
    </div>
  );
}

export function ProgressRing({ value, size = 132, stroke = 14, color = 'mint', label, children }: { value: number; size?: number; stroke?: number; color?: Pastel; label?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2 - 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }} role="img" aria-label={label ?? `${Math.round(v)}% complete`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r + stroke / 2} fill="none" className="d-ink" strokeWidth={2} />
        <circle cx={size / 2} cy={size / 2} r={r - stroke / 2} fill="none" className="d-ink" strokeWidth={2} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" className="d-surface" style={{ stroke: 'var(--c-surface)' }} strokeWidth={stroke - 2} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          style={{ stroke: `var(--c-${color})`, transition: 'stroke-dashoffset 400ms ease' }}
          strokeWidth={stroke - 2}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v / 100)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}

// ---------- Inputs ----------
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input({ className, ...rest }, ref) {
  return <input ref={ref} className={cx('nb-input', className)} {...rest} />;
});
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea({ className, ...rest }, ref) {
  return <textarea ref={ref} className={cx('nb-input', className)} {...rest} />;
});

export function Field({ label, hint, children, id }: { label: string; hint?: string; children: (id: string) => ReactNode; id?: string }) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <div>
      <label htmlFor={fid} className="nb-label">
        {label}
      </label>
      {children(fid)}
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function Checkbox({ checked, onChange, label, id, className, labelClassName }: { checked: boolean; onChange: (v: boolean) => void; label: ReactNode; id?: string; className?: string; labelClassName?: string }) {
  const auto = useId();
  const cid = id ?? auto;
  return (
    <div className={cx('flex items-start gap-3', className)}>
      <input id={cid} type="checkbox" className="nb-check mt-1" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <label htmlFor={cid} className={cx('cursor-pointer leading-snug', checked && 'text-muted line-through decoration-2', labelClassName)}>
        {label}
      </label>
    </div>
  );
}

export function Select({ className, children, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cx('nb-input cursor-pointer', className)} {...rest}>
      {children}
    </select>
  );
}

// ---------- Tabs ----------
export function Tabs<T extends string>({ tabs, value, onChange, label }: { tabs: { id: T; label: ReactNode }[]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          type="button"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          onKeyDown={(e) => {
            const i = tabs.findIndex((x) => x.id === value);
            if (e.key === 'ArrowRight') onChange(tabs[(i + 1) % tabs.length].id);
            if (e.key === 'ArrowLeft') onChange(tabs[(i - 1 + tabs.length) % tabs.length].id);
          }}
          className={cx('nb-btn nb-btn-sm', value === t.id ? 'bg-butter' : 'shadow-none')}
          style={value === t.id ? undefined : { boxShadow: 'none' }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ---------- Callouts ----------
const CALLOUT_META = {
  tip: { color: 'mint' as Pastel, title: 'Tip', icon: <Lightbulb size={16} aria-hidden /> },
  warning: { color: 'pink' as Pastel, title: 'Watch out', icon: <TriangleAlert size={16} aria-hidden /> },
  example: { color: 'sky' as Pastel, title: 'Example', icon: <BookOpen size={16} aria-hidden /> },
  interview: { color: 'lavender' as Pastel, title: 'Interview angle', icon: <MessagesSquare size={16} aria-hidden /> },
};
export function Callout({ kind, title, children }: { kind: keyof typeof CALLOUT_META; title?: string; children: ReactNode }) {
  const m = CALLOUT_META[kind];
  return (
    <div role="note" className={cx('nb-card p-4', `bg-${m.color}`)}>
      <p className="mb-1 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide">
        {m.icon}
        {title ?? m.title}
      </p>
      <div className="text-[0.95rem]">{children}</div>
    </div>
  );
}

// ---------- Page header ----------
export function PageHeader({ title, kicker, children, color }: { title: ReactNode; kicker?: ReactNode; children?: ReactNode; color?: Pastel }) {
  return (
    <header className="mb-6">
      {kicker && <div className="mb-2 flex flex-wrap items-center gap-2">{kicker}</div>}
      <h1 className={cx('text-3xl font-bold sm:text-4xl', color && '')}>{title}</h1>
      {children && <div className="mt-2 max-w-[70ch] text-muted">{children}</div>}
    </header>
  );
}

export function Stat({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div>
      <div className="font-display text-xs font-semibold uppercase tracking-wide text-muted">{label}</div>
      <div className="font-display text-2xl font-bold leading-tight">{value}</div>
      {sub && <div className="text-xs text-muted">{sub}</div>}
    </div>
  );
}

export function Reveal({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="nb-card my-4 p-4">
      <Button size="sm" color={open ? 'butter' : undefined} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {open ? 'Hide' : label}
      </Button>
      {open && <div className="pop-in mt-4">{children}</div>}
    </div>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-[10px] border-2 border-dashed border-line/50 p-6 text-center">
      <p className="font-display font-bold">{title}</p>
      {children && <div className="mt-1 text-sm text-muted">{children}</div>}
    </div>
  );
}

export function useConfirm() {
  return (msg: string) => window.confirm(msg);
}
