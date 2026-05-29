import React, { useState } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import MacroRing from '../components/MacroRing';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import FoodItemRow from '../components/FoodItemRow';
import WaterStrip from '../components/WaterStrip';
import ProgressBar from '../components/ProgressBar';
import BgOrbs from '../components/BgOrbs';
import FoodDetailSheet from '../components/FoodDetailSheet';
import { T, PRIMARY_GRAD } from '../theme';
import { PLAN, TODAY_MEALS, LIBRARY } from '../data';

export default function HomeScreen({ navigation }) {
  const [water, setWater] = useState(PLAN.water);
  const [selectedFood, setSelectedFood] = useState(null);
  const plan = PLAN;
  const remaining = plan.calGoal - plan.calEaten;

  const preview = [
    TODAY_MEALS.Lunch[0],
    TODAY_MEALS.Dinner[0],
    TODAY_MEALS.Breakfast[0],
  ];

  return (
    <View style={styles.bg}>
      <StatusBar style="light" />
      <BgOrbs />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <SafeAreaView>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good morning, Yacine 👋</Text>
              <Text style={styles.date}>Friday, May 29</Text>
            </View>
            <LinearGradient colors={PRIMARY_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.avatarRing}>
              <View style={styles.avatarInner}>
                <Text style={styles.avatarLetter}>Y</Text>
              </View>
            </LinearGradient>
          </View>
        </SafeAreaView>

        {/* Hero calorie ring */}
        <View style={styles.ringWrap}>
          <MacroRing size={210} strokeWidth={13} value={plan.calEaten} goal={plan.calGoal}>
            <Text style={styles.remaining}>{remaining.toLocaleString()}</Text>
            <Text style={styles.kcalLeft}>kcal left</Text>
            <Text style={styles.eaten}>{plan.calEaten.toLocaleString()} of {plan.calGoal.toLocaleString()} eaten</Text>
          </MacroRing>
        </View>

        {/* Mini macro rings */}
        <View style={styles.miniRings}>
          {[
            ['🥩', 'Protein', plan.protein, T.success],
            ['🌾', 'Carbs', plan.carbs, T.warning],
            ['🥑', 'Fat', plan.fat, T.yellow],
          ].map(([emoji, label, m, color]) => (
            <View key={label} style={styles.miniRingCell}>
              <MacroRing size={84} strokeWidth={7} value={m.v} goal={m.g} colors={[color, color]}>
                <Text style={{ fontSize: 17 }}>{emoji}</Text>
              </MacroRing>
              <Text style={styles.miniVal}>{m.v}<Text style={styles.miniGoal}> / {m.g}g</Text></Text>
              <Text style={styles.miniLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Fiber */}
        <GlassCard style={styles.fiberCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Text style={styles.fiberLabel}>🌿 Fiber</Text>
            <ProgressBar value={plan.fiber.v} goal={plan.fiber.g} colors={['#34D399', '#10B981']} />
            <Text style={styles.fiberVal}>{plan.fiber.v}g / {plan.fiber.g}g</Text>
          </View>
        </GlassCard>

        {/* Water */}
        <View style={{ marginBottom: 20 }}>
          <WaterStrip count={water} onChange={setWater} />
        </View>

        {/* Meals preview */}
        <SectionHeader
          title="Today's Meals"
          action="See All →"
          onAction={() => navigation.navigate('Log')}
          style={{ marginBottom: 8 }}
        />
        <GlassCard style={{ paddingHorizontal: 14, paddingVertical: 4 }}>
          {preview.map((f, i) => (
            <View key={f.id} style={i < preview.length - 1 ? styles.divider : null}>
              <FoodItemRow
                food={f}
                onPress={() => setSelectedFood(LIBRARY.find((l) => l.name.includes(f.name.split(' ')[0])) || LIBRARY[0])}
              />
            </View>
          ))}
        </GlassCard>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate('Scan')}
      >
        <LinearGradient colors={PRIMARY_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.fabGrad}>
          <Text style={{ fontSize: 22 }}>📷</Text>
          <View style={styles.fabBadge}>
            <Text style={{ fontSize: 10, color: '#fff', fontWeight: '700' }}>+</Text>
          </View>
        </LinearGradient>
      </Pressable>

      <FoodDetailSheet food={selectedFood} onClose={() => setSelectedFood(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: T.bg },
  scroll: { paddingHorizontal: 20, paddingTop: 8 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 },
  greeting: { fontSize: 20, fontWeight: '600', color: '#fff', letterSpacing: -0.3 },
  date: { fontSize: 13, color: T.t2, marginTop: 2 },
  avatarRing: { width: 42, height: 42, borderRadius: 21, padding: 2 },
  avatarInner: { flex: 1, borderRadius: 20, backgroundColor: '#1a1326', alignItems: 'center', justifyContent: 'center' },
  avatarLetter: { fontSize: 15, fontWeight: '600', color: '#fff' },
  ringWrap: { alignItems: 'center', marginBottom: 8 },
  remaining: { fontSize: 46, fontWeight: '700', letterSpacing: -1.5, color: '#7C3AED' },
  kcalLeft: { fontSize: 13, color: T.t2, marginTop: -2 },
  eaten: { fontSize: 11, color: T.t3, marginTop: 4 },
  miniRings: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 6, marginBottom: 18 },
  miniRingCell: { flex: 1, alignItems: 'center' },
  miniVal: { fontSize: 12, color: '#fff', fontWeight: '600', marginTop: 6 },
  miniGoal: { color: T.t2, fontWeight: '400' },
  miniLabel: { fontSize: 11, color: T.t2 },
  fiberCard: { padding: 14, marginBottom: 14 },
  fiberLabel: { fontSize: 14, color: '#fff', fontWeight: '500', width: 60 },
  fiberVal: { fontSize: 13, color: T.t2, width: 72, textAlign: 'right' },
  divider: { borderBottomWidth: 1, borderBottomColor: T.border },
  fab: {
    position: 'absolute',
    right: 18,
    bottom: 100,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  fabGrad: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
  fabBadge: {
    position: 'absolute', top: -1, right: -1,
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: '#06B6D4',
    borderWidth: 2, borderColor: T.bg,
    alignItems: 'center', justifyContent: 'center',
  },
});
