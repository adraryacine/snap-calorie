import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Pressable, SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import FoodItemRow from '../components/FoodItemRow';
import ProgressBar from '../components/ProgressBar';
import BgOrbs from '../components/BgOrbs';
import FoodDetailSheet from '../components/FoodDetailSheet';
import { T } from '../theme';
import { PLAN, TODAY_MEALS, MEALS, LIBRARY } from '../data';

export default function LogScreen({ navigation }) {
  const plan = PLAN;
  const [expanded, setExpanded] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const eaten = plan.calEaten;
  const burned = 320;
  const remaining = plan.calGoal - eaten;
  const over = remaining < 0;

  const sumMeal = (m) => (TODAY_MEALS[m] || []).reduce((a, f) => a + f.cal, 0);

  return (
    <View style={styles.bg}>
      <StatusBar style="light" />
      <BgOrbs />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={styles.header}>
            <Text style={styles.title}>Food Log</Text>
            <View style={styles.datePicker}>
              <Text style={{ color: T.t2, fontSize: 16 }}>←</Text>
              <Text style={styles.dateText}>Today</Text>
              <Text style={{ color: T.t2, fontSize: 16 }}>→</Text>
            </View>
          </View>
        </SafeAreaView>

        {/* Summary bar */}
        <GlassCard style={styles.summaryCard}>
          {[['🍽️', 'Eaten', eaten.toLocaleString(), { color: '#7C3AED' }],
            ['🔥', 'Burned', burned.toLocaleString(), { color: T.success }],
            [over ? '⚠️' : '✅', 'Remaining', Math.abs(remaining).toLocaleString(), { color: over ? T.error : '#fff' }]
          ].map(([e, l, v, st], i) => (
            <React.Fragment key={l}>
              {i > 0 && <View style={styles.summaryDivider} />}
              <View style={styles.summaryCell}>
                <Text style={{ fontSize: 16 }}>{e}</Text>
                <Text style={[styles.summaryVal, st]}>{v}</Text>
                <Text style={styles.summaryLabel}>{l}</Text>
              </View>
            </React.Fragment>
          ))}
        </GlassCard>

        {/* Meal sections */}
        {MEALS.map((m) => {
          const items = TODAY_MEALS[m] || [];
          return (
            <View key={m} style={{ marginBottom: 18 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={styles.mealTitle}>{m}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  {items.length > 0 && <Text style={{ fontSize: 13, color: T.t2 }}>{sumMeal(m)} kcal</Text>}
                  <View style={styles.addBtn}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>+</Text>
                  </View>
                </View>
              </View>

              {items.length === 0 ? (
                <View style={styles.emptyMeal}>
                  <Text style={styles.emptyText}>Tap + to add {m}</Text>
                </View>
              ) : (
                <GlassCard style={{ paddingHorizontal: 14, paddingVertical: 4 }}>
                  {items.map((f, i) => (
                    <View key={f.id} style={i < items.length - 1 ? styles.divider : null}>
                      <FoodItemRow
                        food={f}
                        showMacros={false}
                        onPress={() => setSelectedFood(LIBRARY[0])}
                      />
                    </View>
                  ))}
                </GlassCard>
              )}
            </View>
          );
        })}
        <View style={{ height: 160 }} />
      </ScrollView>

      {/* Sticky macro bar */}
      <View style={styles.macroBar}>
        <GlassCard radius={20} onPress={() => setExpanded(!expanded)} style={{ padding: 14 }}>
          {!expanded ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {[['P', plan.protein.v, T.success], ['C', plan.carbs.v, T.warning], ['F', plan.fat.v, T.yellow], ['Fiber', plan.fiber.v, '#34D399']].map(([l, v, c]) => (
                <Text key={l} style={{ fontSize: 14, color: T.t2 }}>{l}: <Text style={{ color: c, fontWeight: '600' }}>{v}g</Text></Text>
              ))}
              <Text style={{ color: T.t3, fontSize: 12 }}>▲</Text>
            </View>
          ) : (
            <View style={{ gap: 12 }}>
              {[['Protein', plan.protein, T.success], ['Carbs', plan.carbs, T.warning], ['Fat', plan.fat, T.yellow], ['Fiber', plan.fiber, '#34D399']].map(([l, m, c]) => (
                <View key={l} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <Text style={{ fontSize: 13, color: '#fff', width: 56 }}>{l}</Text>
                  <ProgressBar value={m.v} goal={m.g} colors={[c, c]} animate={false} />
                  <Text style={{ fontSize: 12, color: T.t2, width: 72, textAlign: 'right' }}>{m.v}g / {m.g}g</Text>
                </View>
              ))}
            </View>
          )}
        </GlassCard>
      </View>

      <FoodDetailSheet food={selectedFood} onClose={() => setSelectedFood(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: T.bg },
  scroll: { padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  title: { fontSize: 32, fontWeight: '700', color: '#fff', letterSpacing: -0.6 },
  datePicker: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 999, padding: 8, borderWidth: 1, borderColor: T.border,
  },
  dateText: { fontSize: 13, color: '#fff', fontWeight: '500' },
  summaryCard: { padding: 16, marginBottom: 18, flexDirection: 'row' },
  summaryDivider: { width: 1, backgroundColor: T.border },
  summaryCell: { flex: 1, alignItems: 'center', gap: 2 },
  summaryVal: { fontSize: 20, fontWeight: '700' },
  summaryLabel: { fontSize: 11, color: T.t2 },
  mealTitle: { fontSize: 19, fontWeight: '600', color: '#fff' },
  addBtn: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1, borderColor: T.border,
    alignItems: 'center', justifyContent: 'center',
  },
  emptyMeal: {
    borderWidth: 1.5, borderColor: T.border,
    borderStyle: 'dashed', borderRadius: 18,
    padding: 16, alignItems: 'center',
  },
  emptyText: { fontSize: 13, color: T.t3, fontStyle: 'italic' },
  divider: { borderBottomWidth: 1, borderBottomColor: T.border },
  macroBar: {
    position: 'absolute', left: 16, right: 16, bottom: 80,
  },
});
