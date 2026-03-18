import React, { useEffect, useState } from 'react';
import { Habit } from '../types';
import { calculateProgress } from '../utils';
import { CircularProgress } from './CircularProgress';
import { RotateCcw, Trash2, Trophy, X } from 'lucide-react';

interface HabitDetailModalProps {
  habit: Habit;
  onClose: () => void;
  onReset: (id: string) => void;
  onDelete: (id: string) => void;
}

export function HabitDetailModal({ habit, onClose, onReset, onDelete }: HabitDetailModalProps) {
  const [progress, setProgress] = useState(() => calculateProgress(habit.startDate, habit.goalDays));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(calculateProgress(habit.startDate, habit.goalDays));
    }, 60000);
    return () => clearInterval(interval);
  }, [habit.startDate, habit.goalDays]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-200 relative flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors p-2 bg-slate-700/50 hover:bg-slate-700 rounded-full"
          title="Close"
        >
          <X size={20} />
        </button>

        <div className="mt-4">
          <CircularProgress percentage={progress.percentage} name={habit.name} size={200} strokeWidth={14} />
        </div>

        <div className="w-full mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700/30 p-4 rounded-2xl text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Elapsed</p>
              <p className="text-xl font-semibold text-slate-200">
                {progress.elapsedDays}d {progress.elapsedHours}h
              </p>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-2xl text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Remaining</p>
              <p className="text-xl font-semibold text-slate-200">
                {progress.remainingDays}d {progress.remainingHours}h
              </p>
            </div>
          </div>

          <div className="bg-slate-700/30 p-4 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Start Date</p>
              <p className="text-sm font-medium text-slate-200">
                {new Date(habit.startDate).toLocaleDateString()} {new Date(habit.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Goal</p>
              <p className="text-sm font-medium text-slate-200">{habit.goalDays} Days</p>
            </div>
          </div>

          {progress.isCompleted ? (
            <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-xl flex items-center justify-center gap-2 font-medium border border-emerald-500/20">
              <Trophy size={20} />
              <span>Goal Reached! Amazing job!</span>
            </div>
          ) : (
            <button
              onClick={() => onReset(habit.id)}
              className="w-full flex items-center justify-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 py-3.5 rounded-xl font-medium transition-colors border border-orange-500/20"
            >
              <RotateCcw size={18} />
              <span>Relapse / Reset Progress</span>
            </button>
          )}

          <button
            onClick={() => onDelete(habit.id)}
            className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-red-400 py-2 rounded-xl font-medium transition-colors"
          >
            <Trash2 size={18} />
            <span>Delete Habit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
