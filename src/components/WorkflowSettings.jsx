import React, { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export default function WorkflowSettings({ steps, setSteps }) {
  const [input, setInput] = useState('');

  const addStep = () => {
    if (!input.trim()) return;
    setSteps((prev) => [...prev, input.trim()]);
    setInput('');
  };

  const removeStep = (idx) => setSteps((prev) => prev.filter((_, i) => i !== idx));

  const move = (idx, dir) => {
    setSteps((prev) => {
      const arr = [...prev];
      const newIndex = idx + dir;
      if (newIndex < 0 || newIndex >= arr.length) return prev;
      const [item] = arr.splice(idx, 1);
      arr.splice(newIndex, 0, item);
      return arr;
    });
  };

  const rename = (idx, value) => {
    setSteps((prev) => prev.map((s, i) => (i === idx ? value : s)));
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 text-sm font-semibold text-slate-900">Workflow steps</div>
        <ul className="space-y-2">
          {steps.map((s, i) => (
            <li key={i} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
              <GripVertical className="text-slate-400" size={16} />
              <input
                value={s}
                onChange={(e) => rename(i, e.target.value)}
                className="flex-1 rounded-md border border-transparent bg-white px-2 py-1 text-sm outline-none focus:border-indigo-300"
              />
              <div className="flex items-center gap-1">
                <button
                  onClick={() => move(i, -1)}
                  className="rounded-md px-2 py-1 text-xs text-slate-600 hover:bg-slate-200"
                >
                  Up
                </button>
                <button
                  onClick={() => move(i, 1)}
                  className="rounded-md px-2 py-1 text-xs text-slate-600 hover:bg-slate-200"
                >
                  Down
                </button>
                <button
                  onClick={() => removeStep(i)}
                  className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 placeholder:text-slate-400 focus:ring"
            placeholder="e.g., Upload Manuscript"
          />
          <button
            onClick={addStep}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            <Plus size={16} /> Add step
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          These steps drive the submission wizard. Rename, reorder, or add/remove to match your workflow.
        </p>
      </div>
    </div>
  );
}
