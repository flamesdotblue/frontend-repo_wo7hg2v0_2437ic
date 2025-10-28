import React, { useMemo, useState } from 'react';
import { CheckCircle2, FileText, ChevronRight } from 'lucide-react';

export default function SubmissionWizard({ steps, onSubmitManuscript }) {
  const [active, setActive] = useState(0);
  const [form, setForm] = useState({
    title: '',
    abstract: '',
    authors: '',
    file: null,
    reviewers: '',
  });
  const isLast = active === steps.length - 1;

  const progress = useMemo(() => ((active + 1) / steps.length) * 100, [active, steps.length]);

  const next = () => setActive((i) => Math.min(i + 1, steps.length - 1));
  const prev = () => setActive((i) => Math.max(i - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLast) return next();
    const payload = {
      id: crypto.randomUUID(),
      title: form.title || 'Untitled Manuscript',
      abstract: form.abstract,
      authors: form.authors,
      reviewers: form.reviewers,
      filename: form.file?.name || 'no-file',
      createdAt: new Date().toISOString(),
      status: 'Submitted',
    };
    onSubmitManuscript(payload);
    setActive(0);
    setForm({ title: '', abstract: '', authors: '', file: null, reviewers: '' });
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-900">Submission Steps</div>
          <div className="text-xs text-slate-500">
            Step {active + 1} of {steps.length}
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500 sm:grid-cols-4">
          {steps.map((label, idx) => (
            <div key={idx} className={`flex items-center gap-1 ${idx <= active ? 'text-slate-900' : ''}`}>
              {idx < active ? (
                <CheckCircle2 size={14} className="text-emerald-600" />
              ) : (
                <div className={`h-3 w-3 rounded-full ${idx === active ? 'bg-indigo-600' : 'bg-slate-300'}`} />
              )}
              <span className="truncate">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {steps[active]?.toLowerCase().includes('upload') && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">Upload manuscript (PDF)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setForm((f) => ({ ...f, file: e.target.files?.[0] || null }))}
              className="block w-full rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-6 text-center text-xs text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-xs file:font-medium file:text-white hover:border-slate-400"
            />
          </div>
        )}

        {steps[active]?.toLowerCase().includes('detail') && (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-slate-700">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 placeholder:text-slate-400 focus:ring"
                placeholder="Concise and descriptive title"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-slate-700">Abstract</label>
              <textarea
                rows={4}
                value={form.abstract}
                onChange={(e) => setForm((f) => ({ ...f, abstract: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 placeholder:text-slate-400 focus:ring"
                placeholder="150–250 words summarizing your work"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-slate-700">Authors</label>
              <input
                value={form.authors}
                onChange={(e) => setForm((f) => ({ ...f, authors: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 placeholder:text-slate-400 focus:ring"
                placeholder="Jane Doe; John Smith; …"
              />
            </div>
          </div>
        )}

        {steps[active]?.toLowerCase().includes('review') && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">Suggested reviewers</label>
            <input
              value={form.reviewers}
              onChange={(e) => setForm((f) => ({ ...f, reviewers: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 placeholder:text-slate-400 focus:ring"
              placeholder="Name <email>; Name <email>"
            />
          </div>
        )}

        {steps[active]?.toLowerCase().includes('submit') && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <div className="mb-2 flex items-center gap-2 font-medium text-slate-900">
              <FileText size={16} />
              Review & Submit
            </div>
            <ul className="list-inside list-disc space-y-1">
              <li><span className="font-medium">Title:</span> {form.title || '—'}</li>
              <li><span className="font-medium">Authors:</span> {form.authors || '—'}</li>
              <li><span className="font-medium">Reviewers:</span> {form.reviewers || '—'}</li>
              <li><span className="font-medium">File:</span> {form.file?.name || '—'}</li>
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={active === 0}
            className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-60"
          >
            Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            {isLast ? (
              <>
                Submit
                <CheckCircle2 size={16} className="text-white" />
              </>
            ) : (
              <>
                Continue
                <ChevronRight size={16} className="text-white" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
