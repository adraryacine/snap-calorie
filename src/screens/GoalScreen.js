import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import BgOrbs from '../components/BgOrbs';
import { T } from '../theme';

const GOALS = [
  { icon: '🔥', key: 'Lose', title: 'Lose Weight', sub: 'Create a calorie deficit' },
  { icon: '⚖️', key: 'Maintain', title: 'Maintain Weight', sub: 'Stay at your current weight' },
  { icon: '💪', key: 'Gain', title: 'Gain Muscle', sub: 'Build with a calorie surplus' },
];

function Dots({ active, total = 3 }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === active
              ? { width: 22, backgroundColor: '#7C3AED' }
              : { width: 8, backgroundColor: 'rgba(255,255,255,0.20)' },
          ]}
        />
      ))}
    </View>
  );
}

export default function GoalScreen({ navigation, route }) {
  const [goal, setGoal] = useState(null);

  return (
    <View style={styles.bg}>
      <StatusBar style="light" />
      <BgOrbs />
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Dots active={0} />
          <Text style={styles.h1}>What's your goal?</Text>
          <Text style={styles.sub}>We'll calculate your perfect daily calories.</Text>

          <View style={styles.goals}>
            {GOALS.map((g) => (
              <GlassCard
                key={g.key}
                onPress={() => setGoal(g.key)}
                selected={goal === g.key}
                style={styles.goalCard}
              >
                <View style={styles.goalRow}>
                  <View style={styles.goalIcon}>
                    <Text style={{ fontSize: 26 }}>{g.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.goalTitle}>{g.title}</Text>
                    <Text style={styles.goalSub}>{g.sub}</Text>
                  </View>
                  {goal === g.key && (
                    <View style={styles.check}>
                      <Text style={{ fontSize: 14, color: '#fff' }}>✓</Text>
                    </View>
                  )}
                </View>
              </GlassCard>
            ))}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <GradientButton
            onPress={() => navigation.navigate('Stats', { goal })}
            disabled={!goal}
          >
            Next
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
  dot: { height: 8, borderRadius: 4 },
  h1: { fontSize: 32, fontWeight: '700', color: '#fff', letterSpacing: -0.6, marginBottom: 8 },
  sub: { fontSize: 15, color: T.t2, marginBottom: 28 },
  goals: { gap: 14 },
  goalCard: { padding: 18 },
  goalRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  goalIcon: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  goalTitle: { fontSize: 17, fontWeight: '600', color: '#fff' },
  goalSub: { fontSize: 13, color: T.t2, marginTop: 2 },
  check: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: '#7C3AED',
    alignItems: 'center', justifyContent: 'center',
  },
  footer: { padding: 24, paddingTop: 12 },
});
