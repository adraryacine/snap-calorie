import React, { useState } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet, SafeAreaView, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import BgOrbs from '../components/BgOrbs';
import { T, PRIMARY_GRAD, SECONDARY_GRAD } from '../theme';
import { WEEK_DAYS, WEEK_CALS, WEEK_WEIGHTS, GOAL_WEIGHT, STREAK } from '../data';

const { width: W } = Dimensions.get('window');
const CHART_W = W - 40 - 32; // screen padding + card padding
const CHART_H = 150;
const GOAL_CAL = 1850;

function CalChart() {
  const [tip, setTip] = useState(null);
  const max = Math.max(...WEEK_CALS, GOAL_CAL) * 1.1;

  return (
    <GlassCard style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>Calories</Text>
        <Text style={styles.chartSub}>goal {GOAL_CAL.toLocaleString()}</Text>
      </View>
      <View style={{ height: CHART_H, flexDirection: 'row', alignItems: 'flex-end', gap: 6 }}>
        {/* Goal line */}
        <View style={[styles.goalLine, { bottom: (GOAL_CAL / max) * CHART_H }]} />
        {WEEK_CALS.map((c, i) => {
          const over = c > GOAL_CAL;
          const h = (c / max) * CHART_H;
          return (
            <Pressable key={i} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: CHART_H }} onPress={() => setTip(tip === i ? null : i)}>
              {tip === i && (
                <View style={styles.tooltip}>
                  <Text style={{ fontSize: 11, color: '#fff' }}>{c.toLocaleString()}</Text>
                </View>
              )}
              <LinearGradient
                colors={over ? SECONDARY_GRAD : PRIMARY_GRAD}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ width: '78%', height: h, borderRadius: 6 }}
              />
            </Pressable>
          );
        })}
      </View>
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        {WEEK_DAYS.map((d) => (
          <Text key={d} style={styles.dayLabel}>{d}</Text>
        ))}
      </View>
    </GlassCard>
  );
}

function WeightChart() {
  const pad = 8;
  const vals = WEEK_WEIGHTS;
  const chartW = CHART_W;
  const chartH = 130;
  const min = Math.min(...vals, GOAL_WEIGHT) - 0.3;
  const max = Math.max(...vals) + 0.3;
  const x = (i) => pad + (i * (chartW - 2 * pad)) / (vals.length - 1);
  const y = (v) => pad + (1 - (v - min) / (max - min)) * (chartH - 2 * pad);
  const pts = vals.map((v, i) => ({ x: x(i), y: y(v) }));

  return (
    <GlassCard style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>Weight Trend</Text>
        <Text style={{ fontSize: 12, color: T.success }}>−1.2 kg this week</Text>
      </View>
      <View style={{ height: chartH, position: 'relative' }}>
        {/* Goal line */}
        <View style={[styles.weightGoalLine, { top: y(GOAL_WEIGHT) }]} />
        <Text style={[styles.goalText, { top: y(GOAL_WEIGHT) - 14 }]}>Goal {GOAL_WEIGHT}</Text>
        {/* Data points */}
        {pts.map((p, i) => (
          <View
            key={i}
            style={[styles.dataPoint, { left: p.x - 3.5, top: p.y - 3.5 }]}
          />
        ))}
      </View>
      <View style={{ flexDirection: 'row', marginTop: 4 }}>
        {WEEK_DAYS.map((d) => (
          <Text key={d} style={styles.dayLabel}>{d}</Text>
        ))}
      </View>
    </GlassCard>
  );
}

export default function ProgressScreen({ navigation }) {
  return (
    <View style={styles.bg}>
      <StatusBar style="light" />
      <BgOrbs />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={styles.header}>
            <Text style={styles.title}>Progress</Text>
            <View style={styles.weekPicker}>
              <Text style={{ color: T.t2, fontSize: 14 }}>←</Text>
              <Text style={styles.weekText}>May 26 – Jun 1</Text>
              <Text style={{ color: T.t2, fontSize: 14 }}>→</Text>
            </View>
          </View>
        </SafeAreaView>

        <CalChart />
        <WeightChart />

        {/* Summary stats */}
        <View style={styles.statsRow}>
          {[['📊', '1,733', 'Avg cal/day'], ['🎯', '86%', 'Adherence'], ['🥩', '108g', 'Avg protein']].map(([e, v, l]) => (
            <GlassCard key={l} radius={18} style={styles.statCard}>
              <Text style={{ fontSize: 18 }}>{e}</Text>
              <Text style={styles.statVal}>{v}</Text>
              <Text style={styles.statLabel}>{l}</Text>
            </GlassCard>
          ))}
        </View>

        {/* Streak */}
        <GlassCard style={styles.streakCard}>
          <Text style={{ fontSize: 40 }}>🔥</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.streakTitle}>7-day streak!</Text>
            <Text style={{ fontSize: 13, color: T.t2, marginTop: 2 }}>Keep it up — you're crushing it!</Text>
            <View style={{ flexDirection: 'row', gap: 6, marginTop: 12 }}>
              {STREAK.week.map((on, i) => (
                <LinearGradient
                  key={i}
                  colors={on ? PRIMARY_GRAD : ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.streakDay, i === 6 && styles.streakDayToday]}
                >
                  <Text style={{ fontSize: 11, color: '#fff' }}>{WEEK_DAYS[i][0]}</Text>
                </LinearGradient>
              ))}
            </View>
          </View>
        </GlassCard>

        {/* Macro balance */}
        <SectionHeader title="Macro Balance" style={{ marginBottom: 12 }} />
        <GlassCard style={{ padding: 16 }}>
          <View style={styles.macroBar}>
            <View style={{ width: '30%', backgroundColor: '#7C3AED' }} />
            <View style={{ width: '46%', backgroundColor: '#F59E0B' }} />
            <View style={{ width: '24%', backgroundColor: '#EAB308' }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            {[['Protein', '30%', '#7C3AED'], ['Carbs', '46%', '#F59E0B'], ['Fat', '24%', '#EAB308']].map(([l, p, c]) => (
              <View key={l} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 9, height: 9, borderRadius: 3, backgroundColor: c }} />
                <Text style={{ fontSize: 13, color: T.t2 }}>{l} <Text style={{ color: '#fff', fontWeight: '600' }}>{p}</Text></Text>
              </View>
            ))}
          </View>
        </GlassCard>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: T.bg },
  scroll: { padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  title: { fontSize: 32, fontWeight: '700', color: '#fff', letterSpacing: -0.6 },
  weekPicker: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 999, padding: 8, borderWidth: 1, borderColor: T.border,
  },
  weekText: { fontSize: 12, color: '#fff', fontWeight: '500' },
  chartCard: { padding: 18, marginBottom: 16 },
  chartHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  chartTitle: { fontSize: 15, fontWeight: '600', color: '#fff' },
  chartSub: { fontSize: 12, color: T.t2 },
  goalLine: { position: 'absolute', left: 0, right: 0, height: 1.5, borderTopWidth: 1.5, borderColor: 'rgba(255,255,255,0.35)', borderStyle: 'dashed' },
  tooltip: {
    position: 'absolute', bottom: '100%', marginBottom: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8, padding: 5,
  },
  dayLabel: { flex: 1, textAlign: 'center', fontSize: 11, color: T.t2 },
  weightGoalLine: { position: 'absolute', left: 0, right: 0, height: 1, borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.3)', borderStyle: 'dashed' },
  goalText: { position: 'absolute', right: 0, fontSize: 10, color: T.t2 },
  dataPoint: {
    position: 'absolute', width: 7, height: 7, borderRadius: 3.5,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#7C3AED',
  },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: { flex: 1, padding: 14, alignItems: 'center', gap: 2 },
  statVal: { fontSize: 18, fontWeight: '700', color: '#fff' },
  statLabel: { fontSize: 11, color: T.t2, textAlign: 'center' },
  streakCard: { padding: 18, flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 22 },
  streakTitle: { fontSize: 22, fontWeight: '700', color: '#7C3AED' },
  streakDay: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  streakDayToday: { borderWidth: 2, borderColor: 'rgba(124,58,237,0.5)' },
  macroBar: { height: 14, borderRadius: 7, flexDirection: 'row', overflow: 'hidden' },
});
