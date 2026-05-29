import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TextInput, Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import BgOrbs from '../components/BgOrbs';
import { T, ACTIVITY, PRIMARY_GRAD } from '../theme';

function TogglePills({ options, value, onChange }) {
  return (
    <View style={pill.row}>
      {options.map((o) => {
        const on = value === o;
        return (
          <Pressable key={o} onPress={() => onChange(o)} style={pill.wrap}>
            {on ? (
              <LinearGradient colors={PRIMARY_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={pill.btn}>
                <Text style={pill.labelOn}>{o}</Text>
              </LinearGradient>
            ) : (
              <View style={[pill.btn, pill.btnOff]}>
                <Text style={pill.labelOff}>{o}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
const pill = StyleSheet.create({
  row: { flexDirection: 'row', gap: 6, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 999, padding: 3, borderWidth: 1, borderColor: T.border },
  wrap: {},
  btn: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  btnOff: { backgroundColor: 'transparent' },
  labelOn: { fontSize: 14, fontWeight: '600', color: '#fff' },
  labelOff: { fontSize: 14, fontWeight: '600', color: T.t2 },
});

function Field({ label, children }) {
  return (
    <GlassCard style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </GlassCard>
  );
}

function Dots({ active }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
      {[0, 1, 2].map((i) => (
        <View key={i} style={[{ height: 8, borderRadius: 4 }, i === active ? { width: 22, backgroundColor: '#7C3AED' } : { width: 8, backgroundColor: 'rgba(255,255,255,0.20)' }]} />
      ))}
    </View>
  );
}

export default function StatsScreen({ navigation, route }) {
  const goal = route.params?.goal ?? 'Lose';
  const [age, setAge] = useState('28');
  const [sex, setSex] = useState('Male');
  const [weight, setWeight] = useState('78');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [height, setHeight] = useState('180');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [activity, setActivity] = useState('Moderate');

  const handleNext = () => {
    navigation.navigate('Results', {
      goal,
      stats: {
        age: Number(age), sex, weight: Number(weight), weightUnit,
        height: Number(height), heightUnit, activity,
      },
    });
  };

  return (
    <View style={styles.bg}>
      <StatusBar style="light" />
      <BgOrbs />
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <Dots active={1} />
          <Text style={styles.h1}>Tell us about you</Text>
          <Text style={styles.sub}>This fine-tunes your daily target.</Text>

          <View style={{ gap: 12 }}>
            <Field label="Age">
              <TextInput
                value={age} onChangeText={setAge}
                keyboardType="number-pad" style={styles.input}
                placeholderTextColor={T.t3}
              />
            </Field>

            <Field label="Biological sex">
              <TogglePills options={['Male', 'Female']} value={sex} onChange={setSex} />
            </Field>

            <Field label="Current weight">
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <TextInput value={weight} onChangeText={setWeight} keyboardType="decimal-pad" style={styles.input} />
                <TogglePills options={['kg', 'lb']} value={weightUnit} onChange={setWeightUnit} />
              </View>
            </Field>

            <Field label="Height">
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <TextInput value={height} onChangeText={setHeight} keyboardType="decimal-pad" style={styles.input} />
                <TogglePills options={['cm', 'ft']} value={heightUnit} onChange={setHeightUnit} />
              </View>
            </Field>

            <View>
              <Text style={[styles.fieldLabel, { marginBottom: 10 }]}>Activity level</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  {ACTIVITY.map((a) => {
                    const on = activity === a.name;
                    return (
                      <Pressable key={a.name} onPress={() => setActivity(a.name)}>
                        {on ? (
                          <LinearGradient colors={PRIMARY_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.actBtn}>
                            <Text style={{ fontSize: 20 }}>{a.icon}</Text>
                            <Text style={[styles.actLabel, { color: '#fff' }]}>{a.name}</Text>
                          </LinearGradient>
                        ) : (
                          <View style={[styles.actBtn, styles.actBtnOff]}>
                            <Text style={{ fontSize: 20 }}>{a.icon}</Text>
                            <Text style={styles.actLabel}>{a.name}</Text>
                          </View>
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <GradientButton onPress={handleNext}>Calculate My Plan →</GradientButton>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: T.bg },
  safe: { flex: 1 },
  scroll: { padding: 24, paddingBottom: 0 },
  h1: { fontSize: 32, fontWeight: '700', color: '#fff', letterSpacing: -0.6, marginBottom: 8 },
  sub: { fontSize: 15, color: T.t2, marginBottom: 24 },
  field: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  fieldLabel: { fontSize: 15, color: '#fff', fontWeight: '500' },
  input: {
    width: 56, textAlign: 'right',
    color: '#fff', fontSize: 17, fontWeight: '600',
  },
  actBtn: {
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 16,
    alignItems: 'center', gap: 4, minWidth: 72,
  },
  actBtnOff: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: T.border,
  },
  actLabel: { fontSize: 12, fontWeight: '600', color: T.t2 },
  footer: { padding: 24, paddingTop: 12 },
});
