export const PLAN = {
  calGoal: 1850,
  calEaten: 1184,
  protein: { v: 96, g: 138 },
  carbs: { v: 142, g: 208 },
  fat: { v: 41, g: 51 },
  fiber: { v: 14, g: 25 },
  water: 5,
};

export const TODAY_MEALS = {
  Breakfast: [
    { id: 'b1', emoji: '🥣', name: 'Greek Yogurt Bowl', portion: '250 g', cal: 232, p: 21, c: 24, f: 6 },
    { id: 'b2', emoji: '🍌', name: 'Banana', portion: '1 medium · 118 g', cal: 105, p: 1, c: 27, f: 0 },
  ],
  Lunch: [
    { id: 'l1', emoji: '🥗', name: 'Grilled Chicken Salad', portion: '320 g', cal: 412, p: 44, c: 18, f: 19 },
    { id: 'l2', emoji: '🍚', name: 'Brown Rice', portion: '150 g', cal: 165, p: 4, c: 34, f: 1 },
  ],
  Dinner: [
    { id: 'd1', emoji: '🐟', name: 'Baked Salmon', portion: '170 g', cal: 354, p: 34, c: 0, f: 22 },
  ],
  Snack: [
    { id: 's1', emoji: '🥜', name: 'Almonds', portion: '20 g', cal: 116, p: 4, c: 4, f: 10 },
  ],
};

export const MEAL_ACCENTS = {
  Breakfast: 'rgba(245,158,11,0.16)',
  Lunch: 'rgba(16,185,129,0.16)',
  Dinner: 'rgba(124,58,237,0.18)',
  Snack: 'rgba(6,182,212,0.16)',
};

export const LIBRARY = [
  { id: '1', emoji: '🍗', name: 'Chicken Breast', cat: 'Meat', cal: 165, p: 31, c: 0, f: 3.6, fiber: 0, sugar: 0 },
  { id: '2', emoji: '🍚', name: 'Brown Rice', cat: 'Grains', cal: 216, p: 5, c: 45, f: 1.8, fiber: 3.5, sugar: 0.7 },
  { id: '3', emoji: '🥚', name: 'Whole Egg', cat: 'Protein', cal: 155, p: 13, c: 1.1, f: 11, fiber: 0, sugar: 1.1 },
  { id: '4', emoji: '🍌', name: 'Banana', cat: 'Fruits', cal: 89, p: 1.1, c: 23, f: 0.3, fiber: 2.6, sugar: 12 },
  { id: '5', emoji: '🥛', name: 'Greek Yogurt', cat: 'Dairy', cal: 59, p: 10, c: 3.6, f: 0.4, fiber: 0, sugar: 3.2 },
  { id: '6', emoji: '🐟', name: 'Salmon', cat: 'Meat', cal: 208, p: 20, c: 0, f: 13, fiber: 0, sugar: 0 },
  { id: '7', emoji: '🥑', name: 'Avocado', cat: 'Fruits', cal: 160, p: 2, c: 9, f: 15, fiber: 6.7, sugar: 0.7 },
  { id: '8', emoji: '🌾', name: 'Oats', cat: 'Grains', cal: 389, p: 17, c: 66, f: 7, fiber: 10, sugar: 1 },
  { id: '9', emoji: '🍠', name: 'Sweet Potato', cat: 'Vegetables', cal: 86, p: 1.6, c: 20, f: 0.1, fiber: 3, sugar: 4.2 },
  { id: '10', emoji: '🥜', name: 'Almonds', cat: 'Nuts', cal: 579, p: 21, c: 22, f: 50, fiber: 12.5, sugar: 4.4 },
  { id: '11', emoji: '🥦', name: 'Broccoli', cat: 'Vegetables', cal: 34, p: 2.8, c: 7, f: 0.4, fiber: 2.6, sugar: 1.7 },
  { id: '12', emoji: '🍚', name: 'White Rice', cat: 'Grains', cal: 130, p: 2.7, c: 28, f: 0.3, fiber: 0.4, sugar: 0.1 },
  { id: '13', emoji: '🐟', name: 'Tuna (canned)', cat: 'Meat', cal: 116, p: 26, c: 0, f: 1, fiber: 0, sugar: 0 },
  { id: '14', emoji: '🍎', name: 'Apple', cat: 'Fruits', cal: 52, p: 0.3, c: 14, f: 0.2, fiber: 2.4, sugar: 10 },
  { id: '15', emoji: '🧀', name: 'Cottage Cheese', cat: 'Dairy', cal: 98, p: 11, c: 3.4, f: 4.3, fiber: 0, sugar: 2.7 },
  { id: '16', emoji: '🫘', name: 'Lentils (cooked)', cat: 'Grains', cal: 116, p: 9, c: 20, f: 0.4, fiber: 8, sugar: 1.8 },
  { id: '17', emoji: '🫒', name: 'Olive Oil', cat: 'Supplements', cal: 884, p: 0, c: 0, f: 100, fiber: 0, sugar: 0 },
  { id: '18', emoji: '💪', name: 'Whey Protein', cat: 'Supplements', cal: 400, p: 80, c: 8, f: 5, fiber: 1, sugar: 4 },
  { id: '19', emoji: '🍫', name: 'Dark Chocolate 85%', cat: 'Snacks', cal: 546, p: 5, c: 60, f: 31, fiber: 7, sugar: 24 },
  { id: '20', emoji: '🍊', name: 'Orange', cat: 'Fruits', cal: 47, p: 0.9, c: 12, f: 0.1, fiber: 2.4, sugar: 9 },
];

export const CATEGORIES = [
  ['🍎', 'Fruits'], ['🥦', 'Vegetables'], ['🥛', 'Dairy'], ['🍗', 'Meat'],
  ['🥖', 'Grains'], ['🥜', 'Nuts'], ['🍫', 'Snacks'], ['💊', 'Supplements'],
];

export const SCAN_RESULT = {
  emoji: '🍝',
  name: 'Spaghetti Bolognese',
  confidence: 94,
  base: 100,
  cal: 158, p: 8, c: 19, f: 5, fiber: 2, sugar: 4,
  defaultPortion: 350,
};

export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const WEEK_CALS = [1790, 1910, 1640, 1850, 2040, 1720, 1180];
export const WEEK_WEIGHTS = [78.4, 78.1, 78.2, 77.8, 77.6, 77.5, 77.2];
export const GOAL_WEIGHT = 74.0;
export const STREAK = { days: 7, week: [true, true, true, true, true, true, true] };

export const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
