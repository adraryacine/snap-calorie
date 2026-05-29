import React, { useState } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet, SafeAreaView, Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import BgOrbs from '../components/BgOrbs';
import { T, PRIMARY_GRAD, SECONDARY_GRAD } from '../theme';
import { PLAN } from '../data';

function TogglePillsSmall({ options, value, onChange }) {
  return (
    <View style={pill.row}>
      {options.map((o) => {
        const on = value === o;
        return (
          <Pressable key={o} onPress={() => onChange(o)}>
            {on ? (
              <LinearGradient colors={PRIMARY_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={pill.btn}>
                <Text style={pill.on}>{o}</Text>
              </LinearGradient>
            ) : (
              <View style={[pill.btn, pill.off]}>
                <Text style={pill.offText}>{o}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
const pill = StyleSheet.create({
  row: { flexDirection: 'row', gap: 4, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 999, padding: 3, borderWidth: 1, borderColor: T.border },
  btn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999 },
  off: { backgroundColor: 'transparent' },
  on: { fontSize: 13, fontWeight: '600', color: '#fff' },
  offText: { fontSize: 13, fontWeight: '600', color: T.t2 },
});

function SettingsRow({ label, detail, danger, right, last }) {
  return (
    <View style={[row.wrap, !last && row.border]}>
      <Text style={[row.label, danger && { color: T.error }]}>{label}</Text>
      {detail && <Text style={row.detail}>{detail}</Text>}
      {right ? right : (!danger && <Text style={row.chevron}>›</Text>)}
    </View>
  );
}
const row = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', padding: 14, paddingHorizontal: 16 },
  border: { borderBottomWidth: 1, borderBottomColor: T.border },
  label: { flex: 1, fontSize: 15, color: '#fff' },
  detail: { fontSize: 14, color: T.t2, marginRight: 8 },
  chevron: { fontSize: 20, color: T.t3 },
});

export default function ProfileScreen({ navigation }) {
  const plan = PLAN;
  const [notif, setNotif] = useState(true);
  const [units, setUnits] = useState('kg & cm');
  const [theme, setTheme] = useState('Dark');

  const targets = [
    ['Calories', plan.calGoal.toLocaleString()],
    ['Protein', `${plan.protein.g}g`],
    ['Carbs', `${plan.carbs.g}g`],
    ['Fat', `${plan.fat.g}g`],
    ['Fiber', `${plan.fiber.g}g`],
  ];

  return (
    <View style={styles.bg}>
      <StatusBar style="light" />
      <BgOrbs />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <Text style={styles.title}>Profile</Text>
            <Pressable onPress={() => navigation.navigate('Progress')} style={styles.progressBtn}>
              <Text style={{ fontSize: 13, color: '#fff', fontWeight: '600' }}>📈 Progress</Text>
            </Pressable>
          </View>
        </SafeAreaView>

        {/* Hero card */}
        <GlassCard style={styles.heroCard}>
          <LinearGradient colors={PRIMARY_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.avatarRing}>
            <View style={styles.avatarInner}>
              <Text style={styles.avatarLetter}>Y</Text>
            </View>
          </LinearGradient>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4 }}>
            <Text style={styles.name}>Yacine B.</Text>
            <LinearGradient colors={SECONDARY_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.goalBadge}>
              <Text style={{ fontSize: 12, color: '#fff', fontWeight: '600' }}>🔥 Cutting</Text>
            </LinearGradient>
          </View>
          <View style={styles.statsRow}>
            {[['77.2 kg', 'Current'], ['74.0 kg', 'Goal'], ['28', 'Days active']].map(([v, l], i) => (
              <React.Fragment key={l}>
                {i > 0 && <View style={styles.statDivider} />}
                <View style={styles.statCell}>
                  <Text style={styles.statVal}>{v}</Text>
                  <Text style={styles.statLabel}>{l}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </GlassCard>

        {/* Daily targets */}
        <GlassCard style={{ paddingHorizontal: 16, paddingVertical: 14, marginBottom: 16 }}>
          <SectionHeader title="My Daily Goals" action="Edit" style={{ marginBottom: 10 }} />
          {targets.map(([l, v], i) => (
            <View key={l} style={[styles.targetRow, i < targets.length - 1 && styles.targetBorder]}>
              <Text style={{ flex: 1, fontSize: 14, color: '#fff' }}>{l}</Text>
              <Text style={{ fontSize: 14, color: T.t2, marginRight: 10 }}>{v}</Text>
              <Text style={{ fontSize: 14, color: T.t3 }}>✏️</Text>
            </View>
          ))}
        </GlassCard>

        <Text style={styles.groupLabel}>Personal</Text>
        <GlassCard style={{ marginBottom: 16, overflow: 'hidden' }}>
          <SettingsRow label="Edit Profile" />
          <SettingsRow label="Recalculate TDEE" />
          <SettingsRow label="Activity Level" detail="Moderate" last />
        </GlassCard>

        <Text style={styles.groupLabel}>App</Text>
        <GlassCard style={{ marginBottom: 16, overflow: 'hidden' }}>
          <SettingsRow label="Units" right={<TogglePillsSmall options={['kg & cm', 'lb & ft']} value={units} onChange={setUnits} />} />
          <SettingsRow
            label="Notifications"
            right={
              <Switch
                value={notif}
                onValueChange={setNotif}
                trackColor={{ false: 'rgba(255,255,255,0.15)', true: '#7C3AED' }}
                thumbColor="#fff"
              />
            }
          />
          <SettingsRow label="Theme" right={<TogglePillsSmall options={['Dark', 'Light', 'System']} value={theme} onChange={setTheme} />} last />
        </GlassCard>

        <Text style={styles.groupLabel}>Data</Text>
        <GlassCard style={{ overflow: 'hidden' }}>
          <SettingsRow label="Export Data (CSV)" />
          <SettingsRow label="Clear Today's Log" />
          <SettingsRow label="Delete Account" danger last />
        </GlassCard>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: T.bg },
  scroll: { padding: 20 },
  title: { fontSize: 32, fontWeight: '700', color: '#fff', letterSpacing: -0.6 },
  progressBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: T.border,
  },
  heroCard: { padding: 20, alignItems: 'center', marginBottom: 16 },
  avatarRing: { width: 80, height: 80, borderRadius: 40, padding: 3 },
  avatarInner: { flex: 1, borderRadius: 36, backgroundColor: '#1a1326', alignItems: 'center', justifyContent: 'center' },
  avatarLetter: { fontSize: 28, fontWeight: '600', color: '#fff' },
  name: { fontSize: 22, fontWeight: '600', color: '#fff' },
  goalBadge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3 },
  statsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
  statDivider: { width: 1, backgroundColor: T.border, marginHorizontal: 18 },
  statCell: { alignItems: 'center' },
  statVal: { fontSize: 18, fontWeight: '700', color: '#fff' },
  statLabel: { fontSize: 11, color: T.t2 },
  targetRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 9 },
  targetBorder: { borderBottomWidth: 1, borderBottomColor: T.border },
  groupLabel: { fontSize: 12, color: T.t2, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8, marginLeft: 4 },
});
