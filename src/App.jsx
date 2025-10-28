import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import AuthPanel from './components/AuthPanel';
import SubmissionWizard from './components/SubmissionWizard';
import WorkflowSettings from './components/WorkflowSettings';
import { FileText } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('dashboard');
  const [steps, setSteps] = useState([
    'Upload Manuscript',
    'Details',
    'Assign Reviewers',
    'Submit',
  ]);
  const [manuscripts, setManuscripts] = useState([]);

  const handleLogin = (u) => setUser(u);
  const handleLogout = () => {
    setUser(null);
    setView('dashboard');
  };

  const addManuscript = (m) => {
    setManuscripts((prev) => [m, ...prev]);
    setView('dashboard');
  };

  const emptyState = (
    <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/10 text-indigo-700">
        <FileText />
      </div>
      <div className="text-base font-semibold text-slate-900">No manuscripts yet</div>
      <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
        Get started by submitting your first manuscript. You can customize the workflow steps at any time in Settings.
      </p>
      <button
        onClick={() => setView('submit')}
        className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Start submission
      </button>
    </div>
  );

  const dashboard = (
    <div className="mx-auto max-w-6xl">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Your manuscripts</h2>
          <p className="text-sm text-slate-500">Track progress across each stage of the workflow.</p>
        </div>
        <button
          onClick={() => setView('submit')}
          className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          New submission
        </button>
      </div>

      {manuscripts.length === 0 ? (
        emptyState
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">File</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {manuscripts.map((m) => (
                <tr key={m.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-slate-900">{m.title}</td>
                  <td className="px-4 py-3 text-slate-600">{m.filename}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">{m.status}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{new Date(m.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const mainContent = useMemo(() => {
    if (!user) {
      return (
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-6 max-w-2xl text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">A clean SaaS for manuscript submission</h1>
            <p className="mt-1 text-sm text-slate-600">Sign in to submit manuscripts, track progress, and configure your workflow steps.</p>
          </div>
          <AuthPanel onLogin={handleLogin} />
        </div>
      );
    }

    if (view === 'submit') {
      return <SubmissionWizard steps={steps} onSubmitManuscript={addManuscript} />;
    }

    if (view === 'settings') {
      return <WorkflowSettings steps={steps} setSteps={setSteps} />;
    }

    return dashboard;
  }, [user, view, steps, manuscripts]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header user={user} currentView={view} onChangeView={setView} onLogout={handleLogout} />

      <main className="mx-auto max-w-7xl px-4 py-8">
        {mainContent}
      </main>

      <footer className="mt-8 border-t border-slate-200 bg-white/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ManuFlow. All rights reserved.</p>
          <p>Built for clean, configurable scholarly workflows.</p>
        </div>
      </footer>
    </div>
  );
}
