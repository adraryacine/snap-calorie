import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { T } from '../theme';

export default function GlassCard({
  children,
  style,
  onPress,
  selected = false,
  radius = 24,
}) {
  const containerStyle = [
    styles.container,
    { borderRadius: radius },
    selected && styles.selected,
    style,
  ];

  const inner = (
    <View style={[{ borderRadius: radius, overflow: 'hidden' }, style]}>
      <BlurView
        intensity={20}
        tint="dark"
        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          styles.overlay,
          { borderRadius: radius },
          selected && styles.selectedOverlay,
        ]}
      />
      <View style={[styles.border, { borderRadius: radius }, selected && styles.selectedBorder]} />
      <View style={{ position: 'relative' }}>{children}</View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={{ borderRadius: radius }}>
        {inner}
      </Pressable>
    );
  }
  return inner;
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  selectedOverlay: {
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  border: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  selectedBorder: {
    borderColor: '#7C3AED',
    borderWidth: 2,
  },
});
