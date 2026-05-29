import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import LogScreen from '../screens/LogScreen';
import ScanScreen from '../screens/ScanScreen';
import LibraryScreen from '../screens/LibraryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { T, PRIMARY_GRAD } from '../theme';

const Tab = createBottomTabNavigator();

const ICONS = {
  Home: { emoji: '🏠' },
  Log: { emoji: '📋' },
  Scan: { emoji: '📷' },
  Library: { emoji: '🔍' },
  Profile: { emoji: '👤' },
};

function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 8 }]}>
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.topBorder} />

      {/* Floating scan button */}
      <Pressable
        style={styles.scanWrap}
        onPress={() => navigation.navigate('Scan')}
      >
        <LinearGradient
          colors={PRIMARY_GRAD}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.scanBtn}
        >
          <Text style={{ fontSize: 24 }}>📷</Text>
        </LinearGradient>
      </Pressable>

      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const isScan = route.name === 'Scan';

          if (isScan) return <View key={route.key} style={{ flex: 1 }} />;

          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tab}
            >
              <Text style={[styles.tabIcon, isFocused && styles.tabIconActive]}>
                {ICONS[route.name]?.emoji}
              </Text>
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {route.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Log" component={LogScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
  },
  topBorder: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  scanWrap: {
    position: 'absolute',
    top: -28,
    alignSelf: 'center',
    zIndex: 10,
  },
  scanBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  row: {
    flexDirection: 'row',
    paddingTop: 10,
    height: 60,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  tabIcon: { fontSize: 22, opacity: 0.4 },
  tabIconActive: { opacity: 1 },
  tabLabel: { fontSize: 10, fontWeight: '500', color: T.t3 },
  tabLabelActive: { color: T.primaryFrom, fontWeight: '600' },
});
