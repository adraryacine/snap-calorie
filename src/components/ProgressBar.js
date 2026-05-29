import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { T } from '../theme';

export default function ProgressBar({
  value,
  goal,
  colors = [T.primaryFrom, T.primaryTo],
  height = 8,
  animate = true,
}) {
  const frac = Math.min(1, Math.max(0, goal ? value / goal : 0));
  const width = useRef(new Animated.Value(animate ? 0 : frac)).current;

  useEffect(() => {
    Animated.timing(width, {
      toValue: frac,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [frac]);

  const animatedWidth = width.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.track, { height, borderRadius: height }]}>
      <Animated.View style={{ width: animatedWidth, height, borderRadius: height, overflow: 'hidden' }}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
    flex: 1,
  },
});
