import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { T } from '../theme';

export default function SectionHeader({ title, action, onAction, style }) {
  return (
    <View style={[styles.row, style]}>
      <Text style={styles.title}>{title}</Text>
      {action && (
        <Pressable onPress={onAction}>
          <Text style={styles.action}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: -0.2,
  },
  action: {
    fontSize: 14,
    color: T.t2,
  },
});
