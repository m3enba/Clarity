/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Habit } from './types';
import { HabitForm } from './components/HabitForm';
import { HabitCard } from './components/HabitCard';
import { HabitDetailModal } from './components/HabitDetailModal';
import { ConfirmModal } from './components/ConfirmModal';
import { Leaf, Plus } from 'lucide-react';

export default function App() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [habitToReset, setHabitToReset] = useState<string | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const handleAddHabit = (name: string, goalDays: number, startDate: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      goalDays,
      startDate
    };
    setHabits([newHabit, ...habits]);
  };

  const requestReset = (id: string) => {
    setHabitToReset(id);
    setResetModalOpen(true);
  };

  const confirmReset = () => {
    if (habitToReset) {
      setHabits(habits.map(h => 
        h.id === habitToReset 
          ? { ...h, startDate: new Date().toISOString() } 
          : h
      ));
    }
    setResetModalOpen(false);
    setHabitToReset(null);
  };

  const requestDelete = (id: string) => {
    setHabitToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (habitToDelete) {
      setHabits(habits.filter(h => h.id !== habitToDelete));
      if (selectedHabitId === habitToDelete) {
        setSelectedHabitId(null);
      }
    }
    setDeleteModalOpen(false);
    setHabitToDelete(null);
  };

  const selectedHabit = habits.find(h => h.id === selectedHabitId);

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 pb-24">
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
          <div className="bg-emerald-500/20 p-2 rounded-xl text-emerald-400">
            <Leaf size={24} />
          </div>
          <h1 className="text-xl font-semibold text-slate-100 tracking-tight">Clarity</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-light text-slate-100 mb-2">Welcome back</h2>
          <p className="text-slate-400">Every day is a new opportunity to build better habits.</p>
        </div>

        {habits.length === 0 ? (
          <div className="text-center py-16 bg-slate-800 rounded-2xl border border-slate-700 border-dashed">
            <Leaf size={48} className="mx-auto text-slate-600 mb-4" />
            <h3 className="text-lg font-medium text-slate-200 mb-1">No habits tracked yet</h3>
            <p className="text-slate-400">Add a habit above to start your journey.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onClick={() => setSelectedHabitId(habit.id)}
              />
            ))}
          </div>
        )}
      </main>

      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-8 right-8 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg shadow-emerald-500/20 transition-transform hover:scale-105 z-40 flex items-center justify-center"
        title="Add new habit"
      >
        <Plus size={28} />
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-md animate-in fade-in zoom-in duration-200">
            <HabitForm
              onAdd={(name, goal, date) => {
                handleAddHabit(name, goal, date);
                setIsFormOpen(false);
              }}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}

      {selectedHabit && (
        <HabitDetailModal
          habit={selectedHabit}
          onClose={() => setSelectedHabitId(null)}
          onReset={requestReset}
          onDelete={requestDelete}
        />
      )}

      <ConfirmModal
        isOpen={resetModalOpen}
        title="Relapse?"
        message="Are you sure you want to reset? Don't give up, let's start over!"
        confirmText="Yes, reset progress"
        onConfirm={confirmReset}
        onCancel={() => {
          setResetModalOpen(false);
          setHabitToReset(null);
        }}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Habit"
        message="Are you sure you want to completely remove this habit? This action cannot be undone."
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setHabitToDelete(null);
        }}
      />
    </div>
  );
}
