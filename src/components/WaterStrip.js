import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from './GlassCard';
import { T } from '../theme';

export default function WaterStrip({ count = 0, total = 8, onChange }) {
  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>💧 Water</Text>
        <Text style={styles.count}>{count} / {total} glasses</Text>
      </View>
      <View style={styles.drops}>
        {Array.from({ length: total }).map((_, i) => {
          const on = i < count;
          return (
            <Pressable
              key={i}
              onPress={() => onChange(i + 1 === count ? i : i + 1)}
              style={styles.dropWrap}
            >
              {on ? (
                <LinearGradient
                  colors={['#06B6D4', '#3B82F6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.drop}
                >
                  <Text style={styles.dropEmoji}>💧</Text>
                </LinearGradient>
              ) : (
                <View style={[styles.drop, styles.dropOff]}>
                  <Text style={[styles.dropEmoji, { opacity: 0.4 }]}>💧</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: { fontSize: 14, color: '#fff', fontWeight: '500' },
  count: { fontSize: 13, color: T.t2 },
  drops: { flexDirection: 'row', gap: 6 },
  dropWrap: { flex: 1 },
  drop: {
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropOff: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: T.border,
  },
  dropEmoji: { fontSize: 14 },
});
