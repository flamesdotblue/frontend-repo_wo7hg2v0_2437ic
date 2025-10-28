import React, { useState } from 'react';
import { User } from 'lucide-react';

export default function AuthPanel({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    // Simulated login. Replace with API call later.
    setTimeout(() => {
      const name = email.split('@')[0].replace(/\./g, ' ');
      onLogin({ name: name ? name.charAt(0).toUpperCase() + name.slice(1) : 'User', email });
      setLoading(false);
    }, 600);
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <User size={18} />
        </div>
        <div>
          <div className="text-base font-semibold text-slate-900">Welcome back</div>
          <div className="text-xs text-slate-500">Sign in to continue</div>
        </div>
      </div>

      {error && (
        <div className="mb-3 rounded-md bg-red-50 p-2 text-xs text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 placeholder:text-slate-400 focus:ring"
            placeholder="name@journal.com"
            autoComplete="email"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 placeholder:text-slate-400 focus:ring"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:opacity-70"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-3 text-center text-xs text-slate-500">
        By signing in you agree to our Terms and Privacy Policy.
      </p>
    </div>
  );
}
