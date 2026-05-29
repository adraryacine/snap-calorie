export const T = {
  bg: '#050810',
  surface: 'rgba(255,255,255,0.07)',
  surfaceHi: 'rgba(255,255,255,0.12)',
  border: 'rgba(255,255,255,0.10)',
  primaryFrom: '#7C3AED',
  primaryTo: '#06B6D4',
  secondaryFrom: '#FF6B6B',
  secondaryTo: '#FF8E53',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  yellow: '#EAB308',
  t1: '#FFFFFF',
  t2: 'rgba(255,255,255,0.55)',
  t3: 'rgba(255,255,255,0.30)',
};

export const PRIMARY_GRAD = [T.primaryFrom, T.primaryTo];
export const SECONDARY_GRAD = [T.secondaryFrom, T.secondaryTo];

export const card = {
  backgroundColor: 'rgba(255,255,255,0.07)',
  borderRadius: 24,
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.10)',
};

export const GOAL_MULT = { Lose: 0.80, Maintain: 1.0, Gain: 1.15 };

export const ACTIVITY = [
  { icon: '🪑', name: 'Sedentary', mult: 1.2 },
  { icon: '🚶', name: 'Light', mult: 1.375 },
  { icon: '🏃', name: 'Moderate', mult: 1.55 },
  { icon: '⚡', name: 'Active', mult: 1.725 },
  { icon: '🏋️', name: 'Very Active', mult: 1.9 },
];

export function computePlan(stats) {
  const wKg = stats.weightUnit === 'lb' ? stats.weight * 0.453592 : stats.weight;
  const hCm = stats.heightUnit === 'ft' ? stats.height * 30.48 : stats.height;
  const bmr =
    stats.sex === 'Male'
      ? 10 * wKg + 6.25 * hCm - 5 * stats.age + 5
      : 10 * wKg + 6.25 * hCm - 5 * stats.age - 161;
  const mult = ACTIVITY.find((a) => a.name === stats.activity)?.mult ?? 1.55;
  const tdee = bmr * mult;
  const goalKey = stats.goal || 'Lose';
  const cal = Math.round((tdee * GOAL_MULT[goalKey]) / 10) * 10;
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    mult,
    cal,
    protein: Math.round((cal * 0.3) / 4),
    carbs: Math.round((cal * 0.45) / 4),
    fat: Math.round((cal * 0.25) / 9),
    fiber: Math.round((cal / 1000) * 14),
    goalKey,
  };
}
