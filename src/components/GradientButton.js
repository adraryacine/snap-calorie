import React, { useRef } from 'react';
import { Text, Pressable, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { T, PRIMARY_GRAD, SECONDARY_GRAD } from '../theme';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export default function GradientButton({
  children,
  onPress,
  disabled = false,
  secondary = false,
  style,
  textStyle,
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.965,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={style}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <LinearGradient
          colors={secondary ? SECONDARY_GRAD : PRIMARY_GRAD}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, disabled && styles.disabled]}
        >
          <Text style={[styles.text, textStyle]}>{children}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gradient: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  text: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  disabled: {
    opacity: 0.4,
  },
});
