import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import BgOrbs from '../components/BgOrbs';
import { T, GOAL_MULT, computePlan } from '../theme';

function Dots({ active }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
      {[0, 1, 2].map((i) => (
        <View key={i} style={[{ height: 8, borderRadius: 4 }, i === active ? { width: 22, backgroundColor: '#7C3AED' } : { width: 8, backgroundColor: 'rgba(255,255,255,0.20)' }]} />
      ))}
    </View>
  );
}

export default function ResultsScreen({ navigation, route }) {
  const { goal, stats } = route.params ?? {};
  const [accordionOpen, setAccordionOpen] = useState(false);

  const plan = useMemo(() => computePlan({ ...stats, goal }), [stats, goal]);

  return (
    <View style={styles.bg}>
      <StatusBar style="light" />
      <BgOrbs />
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Dots active={2} />
          <Text style={styles.h1}>Your Daily Plan</Text>

          {/* Hero card */}
          <GlassCard style={styles.heroCard}>
            <Text style={styles.calNum}>{plan.cal.toLocaleString()}</Text>
            <Text style={styles.calLabel}>kcal · Daily Calorie Target</Text>
            <View style={styles.divider} />
            <View style={styles.macroRow}>
              {[['🥩', 'Protein', plan.protein], ['🌾', 'Carbs', plan.carbs], ['🥑', 'Fat', plan.fat], ['🌿', 'Fiber', plan.fiber]].map(([e, l, v]) => (
                <View key={l} style={styles.macroCell}>
                  <Text style={{ fontSize: 18 }}>{e}</Text>
                  <Text style={styles.macroVal}>{v}g</Text>
                  <Text style={styles.macroLabel}>{l}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.tdeeNote}>
              Based on your TDEE of {plan.tdee.toLocaleString()} kcal
              {plan.goalKey === 'Lose' ? ` with a ${Math.round((1 - GOAL_MULT[plan.goalKey]) * 100)}% deficit` : plan.goalKey === 'Gain' ? ` with a ${Math.round((GOAL_MULT[plan.goalKey] - 1) * 100)}% surplus` : ''}
            </Text>
          </GlassCard>

          {/* Accordion */}
          <GlassCard style={{ marginTop: 14 }}>
            <Pressable
              onPress={() => setAccordionOpen(!accordionOpen)}
              style={styles.accordionHeader}
            >
              <Text style={styles.accordionTitle}>How was this calculated?</Text>
              <Text style={{ color: T.t2, fontSize: 16 }}>{accordionOpen ? '▲' : '▼'}</Text>
            </Pressable>
            {accordionOpen && (
              <View style={styles.accordionBody}>
                <Text style={styles.accordionText}>BMR (Mifflin-St Jeor): <Text style={{ color: '#fff' }}>{plan.bmr.toLocaleString()} kcal</Text></Text>
                <Text style={styles.accordionText}>Activity multiplier: <Text style={{ color: '#fff' }}>×{plan.mult}</Text> → TDEE {plan.tdee.toLocaleString()}</Text>
                <Text style={styles.accordionText}>Goal adjustment: <Text style={{ color: '#fff' }}>×{GOAL_MULT[plan.goalKey]}</Text></Text>
                <Text style={[styles.accordionText, { color: T.t3, marginTop: 6 }]}>Macros: 30% Protein / 45% Carbs / 25% Fat</Text>
              </View>
            )}
          </GlassCard>
        </ScrollView>
        <View style={styles.footer}>
          <GradientButton onPress={() => navigation.navigate('Main')}>
            Let's Go! 🎉
          </GradientButton>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: T.bg },
  safe: { flex: 1 },
  scroll: { padding: 24, paddingBottom: 0 },
  h1: { fontSize: 32, fontWeight: '700', color: '#fff', letterSpacing: -0.6, marginBottom: 20 },
  heroCard: { padding: 24, alignItems: 'center' },
  calNum: {
    fontSize: 52, fontWeight: '700', letterSpacing: -1.5,
    color: '#7C3AED',
  },
  calLabel: { fontSize: 13, color: T.t2, marginTop: -2 },
  divider: { height: 1, backgroundColor: T.border, width: '100%', marginVertical: 20 },
  macroRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  macroCell: { alignItems: 'center', flex: 1 },
  macroVal: { fontSize: 18, fontWeight: '700', color: '#fff', marginTop: 3 },
  macroLabel: { fontSize: 11, color: T.t2 },
  tdeeNote: { fontSize: 12, color: T.t3, textAlign: 'center', marginTop: 18 },
  accordionHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 18,
  },
  accordionTitle: { fontSize: 15, fontWeight: '500', color: '#fff' },
  accordionBody: { paddingHorizontal: 18, paddingBottom: 16, gap: 4 },
  accordionText: { fontSize: 13, color: T.t2, lineHeight: 22 },
  footer: { padding: 24, paddingTop: 12 },
});
