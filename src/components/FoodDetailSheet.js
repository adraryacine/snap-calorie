import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import { BlurView } from 'expo-blur';
import GlassCard from './GlassCard';
import GradientButton from './GradientButton';
import PortionStepper from './PortionStepper';
import MealSelector from './MealSelector';
import { T } from '../theme';

const GRID = [
  ['🔥', 'Calories', 'cal', 'kcal'],
  ['🥩', 'Protein', 'p', 'g'],
  ['🌾', 'Carbs', 'c', 'g'],
  ['🥑', 'Fat', 'f', 'g'],
  ['🌿', 'Fiber', 'fiber', 'g'],
  ['🍬', 'Sugar', 'sugar', 'g'],
];

export default function FoodDetailSheet({ food, onClose, onAdd }) {
  const [portion, setPortion] = useState(150);
  const [meal, setMeal] = useState('Lunch');
  const [preset, setPreset] = useState('1 serving');

  if (!food) return null;

  const k = portion / 100;
  const m = {
    cal: Math.round(food.cal * k),
    p: +(food.p * k).toFixed(1),
    c: +(food.c * k).toFixed(1),
    f: +(food.f * k).toFixed(1),
    fiber: +((food.fiber || 0) * k).toFixed(1),
    sugar: +((food.sugar || 0) * k).toFixed(1),
  };

  const setPresetPortion = (p) => {
    setPreset(p);
    if (p === '1 serving') setPortion(150);
    else if (p === '½ serving') setPortion(75);
  };

  return (
    <Modal visible animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <BlurView intensity={10} tint="dark" style={StyleSheet.absoluteFill} />
      </Pressable>
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.emojiBox}>
              <Text style={styles.emoji}>{food.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{food.name}</Text>
              <View style={styles.catBadge}>
                <Text style={styles.catText}>{food.cat}</Text>
              </View>
            </View>
          </View>

          {/* Portion */}
          <Text style={styles.sectionLabel}>Portion size</Text>
          <PortionStepper
            value={portion}
            onChange={(v) => { setPortion(v); setPreset('Custom'); }}
          />
          <View style={styles.presets}>
            {['1 serving', '½ serving', 'Custom'].map((p) => (
              <Pressable
                key={p}
                onPress={() => setPresetPortion(p)}
                style={[styles.presetBtn, preset === p && styles.presetActive]}
              >
                <Text style={[styles.presetText, preset === p && styles.presetTextActive]}>{p}</Text>
              </Pressable>
            ))}
          </View>

          {/* Macro grid */}
          <View style={styles.grid}>
            {GRID.map(([emoji, label, key, unit]) => (
              <GlassCard key={label} radius={18} style={styles.gridCell}>
                <Text style={styles.gridEmoji}>{emoji}</Text>
                <View>
                  <Text style={styles.gridValue}>
                    {m[key]}
                    <Text style={styles.gridUnit}> {unit}</Text>
                  </Text>
                  <Text style={styles.gridLabel}>{label}</Text>
                </View>
              </GlassCard>
            ))}
          </View>

          <View style={{ marginBottom: 16 }}>
            <MealSelector value={meal} onChange={setMeal} />
          </View>

          <GradientButton onPress={() => { onAdd && onAdd(food, meal, m.cal); onClose(); }}>
            Add to Log
          </GradientButton>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  sheet: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    height: '82%',
    backgroundColor: 'rgba(18,20,32,0.98)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.30)',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  scroll: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 },
  emojiBox: {
    width: 64, height: 64, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1, borderColor: T.border,
    alignItems: 'center', justifyContent: 'center',
  },
  emoji: { fontSize: 32 },
  name: { fontSize: 22, fontWeight: '600', color: '#fff', letterSpacing: -0.4 },
  catBadge: {
    marginTop: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: T.border,
  },
  catText: { fontSize: 12, color: T.t2 },
  sectionLabel: { fontSize: 13, color: T.t2, marginBottom: 12 },
  presets: { flexDirection: 'row', gap: 8, marginTop: 16, marginBottom: 22 },
  presetBtn: {
    flex: 1, height: 38, borderRadius: 999,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: T.border,
  },
  presetActive: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderColor: 'rgba(255,255,255,0.30)',
  },
  presetText: { fontSize: 13, fontWeight: '600', color: T.t2 },
  presetTextActive: { color: '#fff' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 22 },
  gridCell: { width: '47%', padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  gridEmoji: { fontSize: 18 },
  gridValue: { fontSize: 17, fontWeight: '700', color: '#fff' },
  gridUnit: { fontSize: 11, fontWeight: '400', color: T.t2 },
  gridLabel: { fontSize: 11, color: T.t2, marginTop: 1 },
});
