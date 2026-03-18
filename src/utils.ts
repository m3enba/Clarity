export function calculateProgress(startDate: string, goalDays: number) {
  const start = new Date(startDate).getTime();
  const now = new Date().getTime();
  const goal = start + goalDays * 24 * 60 * 60 * 1000;

  const elapsed = now - start;
  const total = goal - start;

  let percentage = (elapsed / total) * 100;
  if (percentage > 100) percentage = 100;
  if (percentage < 0) percentage = 0;

  const elapsedDays = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  const elapsedHours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const remaining = goal - now;
  let remainingDays = Math.floor(remaining / (1000 * 60 * 60 * 24));
  let remainingHours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (remaining < 0) {
    remainingDays = 0;
    remainingHours = 0;
  }

  return {
    percentage,
    elapsedDays: Math.max(0, elapsedDays),
    elapsedHours: Math.max(0, elapsedHours),
    remainingDays,
    remainingHours,
    isCompleted: percentage === 100
  };
}
