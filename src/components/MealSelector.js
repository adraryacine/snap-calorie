import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { T, PRIMARY_GRAD } from '../theme';
import { MEALS } from '../data';

export default function MealSelector({ value, onChange }) {
  return (
    <View style={styles.row}>
      {MEALS.map((m) => {
        const on = value === m;
        return (
          <Pressable key={m} onPress={() => onChange(m)} style={styles.item}>
            {on ? (
              <LinearGradient
                colors={PRIMARY_GRAD}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.pill}
              >
                <Text style={styles.labelOn}>{m}</Text>
              </LinearGradient>
            ) : (
              <View style={[styles.pill, styles.pillOff]}>
                <Text style={styles.labelOff}>{m}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  item: { flex: 1 },
  pill: {
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillOff: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: T.border,
  },
  labelOn: { fontSize: 13, fontWeight: '600', color: '#fff' },
  labelOff: { fontSize: 13, fontWeight: '600', color: T.t2 },
});
