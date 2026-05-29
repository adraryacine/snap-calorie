import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import GoalScreen from '../screens/GoalScreen';
import StatsScreen from '../screens/StatsScreen';
import ResultsScreen from '../screens/ResultsScreen';
import TabNavigator from './TabNavigator';
import ProgressScreen from '../screens/ProgressScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#050810' },
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Goal" component={GoalScreen} />
      <Stack.Screen name="Stats" component={StatsScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Progress" component={ProgressScreen} />
    </Stack.Navigator>
  );
}
