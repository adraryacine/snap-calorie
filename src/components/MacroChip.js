import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { T } from '../theme';

export default function MacroChip({ emoji, value, unit = 'g', color = T.t2 }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.value, { color }]}>
        {value}
        <Text style={styles.unit}>{unit}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  emoji: { fontSize: 11 },
  value: { fontSize: 12, fontWeight: '600' },
  unit: { fontSize: 11, fontWeight: '400' },
});
