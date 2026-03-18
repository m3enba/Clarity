import React, { useEffect, useState } from 'react';
import { Habit } from '../types';
import { calculateProgress } from '../utils';
import { CircularProgress } from './CircularProgress';

interface HabitCardProps {
  habit: Habit;
  onClick: () => void;
}

export function HabitCard({ habit, onClick }: HabitCardProps) {
  const [progress, setProgress] = useState(() => calculateProgress(habit.startDate, habit.goalDays));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(calculateProgress(habit.startDate, habit.goalDays));
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [habit.startDate, habit.goalDays]);

  return (
    <div 
      onClick={onClick}
      className="bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-700 flex flex-col items-center h-full cursor-pointer hover:bg-slate-750 hover:border-slate-600 transition-all group"
    >
      <div className="transform transition-transform group-hover:scale-105 duration-300">
        <CircularProgress percentage={progress.percentage} name={habit.name} size={150} strokeWidth={10} />
      </div>
      
      <div className="mt-6 w-full grid grid-cols-2 gap-3 text-center">
        <div className="bg-slate-700/30 p-3 rounded-2xl transition-colors group-hover:bg-slate-700/50">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mb-1">Elapsed</p>
          <p className="text-sm font-semibold text-slate-200">
            {progress.elapsedDays}d {progress.elapsedHours}h
          </p>
        </div>
        <div className="bg-slate-700/30 p-3 rounded-2xl transition-colors group-hover:bg-slate-700/50">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mb-1">Remaining</p>
          <p className="text-sm font-semibold text-slate-200">
            {progress.remainingDays}d {progress.remainingHours}h
          </p>
        </div>
      </div>
    </div>
  );
}
