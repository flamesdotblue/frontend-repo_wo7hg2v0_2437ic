import React from 'react';
import { Rocket, Settings, FileText, User, LogOut } from 'lucide-react';

export default function Header({ user, currentView, onChangeView, onLogout }) {
  const NavButton = ({ id, label, Icon }) => (
    <button
      onClick={() => onChangeView(id)}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        currentView === id
          ? 'bg-indigo-600 text-white'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
      }`}
      aria-current={currentView === id ? 'page' : undefined}
    >
      <Icon size={16} />
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Rocket size={18} />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight text-slate-900">ManuFlow</div>
            <div className="text-xs text-slate-500">Clean SaaS for manuscript workflows</div>
          </div>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          <NavButton id="dashboard" label="Dashboard" Icon={FileText} />
          <NavButton id="submit" label="Submit" Icon={Rocket} />
          <NavButton id="settings" label="Settings" Icon={Settings} />
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden text-right md:block">
                <div className="text-sm font-medium text-slate-900">{user.name}</div>
                <div className="text-xs text-slate-500">{user.email}</div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <User size={18} />
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-700"
              >
                <LogOut size={14} />
                Logout
              </button>
            </>
          ) : (
            <div className="text-xs text-slate-500">Not signed in</div>
          )}
        </div>
      </div>

      <div className="block border-t border-slate-200 md:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-auto px-4 py-2">
          <NavButton id="dashboard" label="Dashboard" Icon={FileText} />
          <NavButton id="submit" label="Submit" Icon={Rocket} />
          <NavButton id="settings" label="Settings" Icon={Settings} />
        </div>
      </div>
    </header>
  );
}
