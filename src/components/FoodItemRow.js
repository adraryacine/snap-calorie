import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { T } from '../theme';
import MacroChip from './MacroChip';

export default function FoodItemRow({
  food,
  onPress,
  right,
  sub,
  showMacros = true,
  accent,
}) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={[styles.icon, accent ? { backgroundColor: accent } : null]}>
        <Text style={styles.emoji}>{food.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{food.name}</Text>
        <Text style={styles.sub}>{sub != null ? sub : food.portion}</Text>
        {showMacros && (
          <View style={styles.chips}>
            <MacroChip emoji="🥩" value={food.p} color={T.success} />
            <MacroChip emoji="🌾" value={food.c} color={T.warning} />
            <MacroChip emoji="🥑" value={food.f} color={T.yellow} />
          </View>
        )}
      </View>
      <View style={styles.right}>
        {right != null ? (
          right
        ) : (
          <Text style={styles.cal}>
            {food.cal}
            <Text style={styles.kcal}> kcal</Text>
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  emoji: { fontSize: 22 },
  info: { flex: 1, minWidth: 0 },
  name: { fontSize: 15, color: '#fff', fontWeight: '500', letterSpacing: -0.1 },
  sub: { fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 1 },
  chips: { flexDirection: 'row', gap: 6, marginTop: 7, flexWrap: 'wrap' },
  right: { flexShrink: 0, alignItems: 'flex-end' },
  cal: { fontSize: 15, color: '#fff', fontWeight: '600' },
  kcal: { fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: '400' },
});
