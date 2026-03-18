import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface HabitFormProps {
  onAdd: (name: string, goalDays: number, startDate: string) => void;
  onCancel?: () => void;
}

export function HabitForm({ onAdd, onCancel }: HabitFormProps) {
  const [name, setName] = useState('');
  const [goalDays, setGoalDays] = useState(30);
  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || goalDays <= 0) return;
    onAdd(name.trim(), goalDays, new Date(startDate).toISOString());
    setName('');
    setGoalDays(30);
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setStartDate(now.toISOString().slice(0, 16));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 relative">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors p-1"
          title="Close"
        >
          <X size={20} />
        </button>
      )}
      <h2 className="text-xl font-medium text-slate-100 mb-6">Start a new journey</h2>
      
      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Habit to break</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Smoking, Sugar"
            className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Goal (Days)</label>
          <input
            type="number"
            value={goalDays}
            onChange={(e) => setGoalDays(Number(e.target.value))}
            min="1"
            className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Start Date & Time</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
            required
          />
        </div>
      </div>
      
      <div className="mt-8 flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl font-medium text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
        >
          <Plus size={18} />
          <span>Add Habit</span>
        </button>
      </div>
    </form>
  );
}
