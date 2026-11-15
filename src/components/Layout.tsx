import { useEffect, useState, Suspense, type ReactNode } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Sun,
  Map,
  Wrench,
  FileText,
  Shapes,
  MessagesSquare,
  Briefcase,
  FolderKanban,
  BookA,
  CalendarCheck,
  Ban,
  Settings as SettingsIcon,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  MoreHorizontal,
  X,
  Flame,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { streak } from '../lib/progress';
import { cx } from './ui';
import { SearchDialog } from './SearchDialog';
import { useTheme } from '../lib/theme';

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
}

const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: 'Learn',
    items: [
      { to: '/', label: 'Dashboard', icon: <LayoutDashboard size={18} aria-hidden /> },
      { to: '/today', label: 'Today', icon: <Sun size={18} aria-hidden /> },
      { to: '/roadmap', label: 'Roadmap', icon: <Map size={18} aria-hidden /> },
      { to: '/review', label: 'Weekly review', icon: <CalendarCheck size={18} aria-hidden /> },
    ],
  },
  {
    group: 'Practise',
    items: [
      { to: '/toolkit', label: 'Toolkit', icon: <Wrench size={18} aria-hidden /> },
      { to: '/templates', label: 'Templates', icon: <FileText size={18} aria-hidden /> },
      { to: '/frameworks', label: 'Frameworks', icon: <Shapes size={18} aria-hidden /> },
      { to: '/glossary', label: 'Glossary', icon: <BookA size={18} aria-hidden /> },
    ],
  },
  {
    group: 'Get hired',
    items: [
      { to: '/interview', label: 'Interview prep', icon: <MessagesSquare size={18} aria-hidden /> },
      { to: '/jobs', label: 'Job search', icon: <Briefcase size={18} aria-hidden /> },
      { to: '/portfolio', label: 'Portfolio', icon: <FolderKanban size={18} aria-hidden /> },
      { to: '/skip', label: 'Skip this', icon: <Ban size={18} aria-hidden /> },
    ],
  },
];

const MOBILE_TABS: NavItem[] = [
  { to: '/', label: 'Home', icon: <LayoutDashboard size={20} aria-hidden /> },
  { to: '/today', label: 'Today', icon: <Sun size={20} aria-hidden /> },
  { to: '/roadmap', label: 'Roadmap', icon: <Map size={20} aria-hidden /> },
  { to: '/toolkit', label: 'Toolkit', icon: <Wrench size={20} aria-hidden /> },
];

function Logo({ compact }: { compact?: boolean }) {
  return (
    <NavLink to="/" className="flex items-center gap-2 rounded-[10px]" aria-label="PM Path home">
      <svg width="32" height="32" viewBox="0 0 64 64" aria-hidden>
        <rect x="4" y="4" width="56" height="56" rx="12" fill="#D9CCF5" stroke="#1E1E24" strokeWidth="4" />
        <path d="M20 44V20h14a8 8 0 0 1 0 16H20" fill="none" stroke="#1E1E24" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {!compact && <span className="font-display text-lg font-bold">PM Path</span>}
    </NavLink>
  );
}

function SideLink({ item, collapsed, onClick }: { item: NavItem; collapsed?: boolean; onClick?: () => void }) {
  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cx(
          'flex items-center gap-3 rounded-[10px] border-2 px-3 py-2 font-display text-[0.92rem] font-semibold transition-colors',
          isActive ? 'border-line bg-butter text-onpastel shadow-[2px_2px_0_var(--c-line)]' : 'border-transparent hover:border-line',
          collapsed && 'justify-center px-0',
        )
      }
    >
      {item.icon}
      {!collapsed && <span>{item.label}</span>}
      {collapsed && <span className="sr-only">{item.label}</span>}
    </NavLink>
  );
}

export function Layout() {
  useTheme();
  const loc = useLocation();
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('pm-path-sidebar') === '1';
    } catch {
      return false;
    }
  });
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const data = useStore();
  const s = streak(data);

  useEffect(() => {
    try {
      localStorage.setItem('pm-path-sidebar', collapsed ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || (e.target as HTMLElement)?.isContentEditable)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    setMoreOpen(false);
    if (!loc.hash) window.scrollTo(0, 0);
  }, [loc.pathname, loc.hash]);

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only-focusable nb-btn fixed left-2 top-2 z-50 bg-butter">
        Skip to content
      </a>
      {/* Desktop sidebar */}
      <aside
        className={cx('fixed inset-y-0 left-0 z-30 hidden flex-col border-r-2 border-line bg-surface lg:flex', collapsed ? 'w-[76px]' : 'w-[248px]')}
        aria-label="Main navigation"
      >
        <div className={cx('flex items-center p-4', collapsed ? 'justify-center' : 'justify-between')}>
          <Logo compact={collapsed} />
        </div>
        <button onClick={() => setSearchOpen(true)} className={cx('nb-input mx-4 mb-3 flex w-auto items-center gap-2 text-left text-sm text-muted', collapsed && 'justify-center px-0')} aria-label="Search (Ctrl+K)">
          <Search size={16} aria-hidden />
          {!collapsed && (
            <>
              <span className="flex-1">Search…</span>
              <kbd className="rounded border border-line/40 px-1 text-[0.7rem]">⌘K</kbd>
            </>
          )}
        </button>
        <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 pb-3">
          {NAV.map((g) => (
            <div key={g.group} className="mb-3">
              {!collapsed && <div className="px-3 pb-1 pt-2 font-display text-[0.7rem] font-bold uppercase tracking-widest text-muted">{g.group}</div>}
              <div className="space-y-1">
                {g.items.map((it) => (
                  <SideLink key={it.to} item={it} collapsed={collapsed} />
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="space-y-1 border-t-2 border-line p-3">
          <SideLink item={{ to: '/settings', label: 'Settings', icon: <SettingsIcon size={18} aria-hidden /> }} collapsed={collapsed} />
          <button
            onClick={() => setCollapsed((c) => !c)}
            className={cx('flex w-full items-center gap-3 rounded-[10px] border-2 border-transparent px-3 py-2 font-display text-[0.92rem] font-semibold hover:border-line', collapsed && 'justify-center px-0')}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeftOpen size={18} aria-hidden /> : <PanelLeftClose size={18} aria-hidden />}
            {!collapsed && 'Collapse'}
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b-2 border-line bg-surface px-4 py-2.5 lg:hidden">
        <Logo />
        <div className="flex items-center gap-2">
          {s > 0 && (
            <span className="nb-chip bg-pink" aria-label={`${s}-day streak`}>
              <Flame size={13} aria-hidden /> {s}
            </span>
          )}
          <button className="nb-btn nb-btn-sm" onClick={() => setSearchOpen(true)} aria-label="Search">
            <Search size={16} aria-hidden />
          </button>
        </div>
      </header>

      <main id="main" className={cx('px-4 pb-28 pt-6 sm:px-6 lg:pb-12 lg:pt-8', collapsed ? 'lg:pl-[108px]' : 'lg:pl-[280px]', 'lg:pr-8')}>
        <div className="mx-auto max-w-[1180px]">
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </div>
      </main>

      {/* Mobile bottom tabs */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t-2 border-line bg-surface lg:hidden" aria-label="Main navigation">
        {MOBILE_TABS.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.to === '/'}
            className={({ isActive }) => cx('flex flex-col items-center gap-0.5 py-2 font-display text-[0.7rem] font-semibold', isActive && 'bg-butter text-onpastel')}
          >
            {it.icon}
            {it.label}
          </NavLink>
        ))}
        <button onClick={() => setMoreOpen(true)} className="flex flex-col items-center gap-0.5 py-2 font-display text-[0.7rem] font-semibold" aria-haspopup="dialog" aria-expanded={moreOpen}>
          <MoreHorizontal size={20} aria-hidden />
          More
        </button>
      </nav>

      {moreOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="All pages">
          <button className="absolute inset-0 bg-black/30" aria-label="Close menu" onClick={() => setMoreOpen(false)} />
          <div className="pop-in absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-[16px] border-t-2 border-line bg-surface p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-display text-lg font-bold">All pages</span>
              <button className="nb-btn nb-btn-sm" onClick={() => setMoreOpen(false)} aria-label="Close">
                <X size={16} aria-hidden />
              </button>
            </div>
            {NAV.map((g) => (
              <div key={g.group} className="mb-3">
                <div className="px-1 pb-1 font-display text-[0.7rem] font-bold uppercase tracking-widest text-muted">{g.group}</div>
                <div className="grid grid-cols-2 gap-2">
                  {g.items.map((it) => (
                    <SideLink key={it.to} item={it} onClick={() => setMoreOpen(false)} />
                  ))}
                </div>
              </div>
            ))}
            <SideLink item={{ to: '/settings', label: 'Settings', icon: <SettingsIcon size={18} aria-hidden /> }} onClick={() => setMoreOpen(false)} />
          </div>
        </div>
      )}

      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="grid min-h-[40vh] place-items-center" role="status" aria-live="polite">
      <span className="nb-chip bg-butter">Loading…</span>
    </div>
  );
}
