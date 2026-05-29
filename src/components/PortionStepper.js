import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { T } from '../theme';

export default function PortionStepper({
  value,
  onChange,
  step = 5,
  unit = 'g',
  min = 5,
  max = 1500,
}) {
  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));

  return (
    <View style={styles.row}>
      <Pressable onPress={decrement} style={styles.btn}>
        <Text style={styles.btnText}>−</Text>
      </Pressable>
      <View style={styles.valueBox}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
      <Pressable onPress={increment} style={styles.btn}>
        <Text style={styles.btnText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  btn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: T.border,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { color: '#fff', fontSize: 26, fontWeight: '300', lineHeight: 30 },
  valueBox: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  value: { fontSize: 28, fontWeight: '600', color: '#fff', letterSpacing: -0.5, minWidth: 56, textAlign: 'center' },
  unit: { fontSize: 16, color: T.t2 },
});
