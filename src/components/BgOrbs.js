import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function BgOrbs() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={styles.orbTR} />
      <View style={styles.orbBL} />
    </View>
  );
}

const styles = StyleSheet.create({
  orbTR: {
    position: 'absolute',
    top: -120,
    right: -110,
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: 'rgba(124,58,237,0.30)',
  },
  orbBL: {
    position: 'absolute',
    bottom: -140,
    left: -120,
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: 'rgba(6,182,212,0.30)',
  },
});
