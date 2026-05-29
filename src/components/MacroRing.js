import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
let _seq = 0;

export default function MacroRing({
  size = 200,
  strokeWidth = 12,
  value = 0,
  goal = 1,
  colors = ['#7C3AED', '#06B6D4'],
  track = 'rgba(255,255,255,0.09)',
  children,
}) {
  const id = useRef(`rg${_seq++}`).current;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const cx = size / 2;
  const frac = goal > 0 ? Math.min(1, Math.max(0, value / goal)) : 0;

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: frac,
      duration: 850,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [frac]);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circ, 0],
  });

  const isGrad = Array.isArray(colors) && colors.length >= 2;

  return (
    <View style={{ width: size, height: size }}>
      <Svg
        width={size}
        height={size}
        style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}
      >
        {isGrad && (
          <Defs>
            <LinearGradient
              id={id}
              x1="0"
              y1="0"
              x2={size}
              y2={size}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor={colors[0]} />
              <Stop offset="1" stopColor={colors[1]} />
            </LinearGradient>
          </Defs>
        )}
        <Circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke={track}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke={isGrad ? `url(#${id})` : colors[0]}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circ} ${circ}`}
          strokeLinecap="round"
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <View
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </View>
    </View>
  );
}
