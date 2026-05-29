import React from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import GradientButton from '../components/GradientButton';
import BgOrbs from '../components/BgOrbs';
import { T, PRIMARY_GRAD } from '../theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.bg}>
      <StatusBar style="light" />
      <BgOrbs />
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <LinearGradient
            colors={PRIMARY_GRAD}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logo}
          >
            <Text style={styles.logoIcon}>📸</Text>
          </LinearGradient>
          <Text style={styles.appName}>Snap-Cal</Text>
          <Text style={styles.tagline}>Eat smart. See results.</Text>
        </View>
        <View style={styles.bottom}>
          <GradientButton onPress={() => navigation.navigate('Goal')} style={styles.btn}>
            Get Started
          </GradientButton>
          <Pressable onPress={() => navigation.navigate('Main')}>
            <Text style={styles.signIn}>
              Already have an account?{' '}
              <Text style={styles.signInLink}>Sign in</Text>
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: T.bg },
  safe: { flex: 1, justifyContent: 'space-between', padding: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: {
    width: 96, height: 96, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 28,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 32,
    elevation: 12,
  },
  logoIcon: { fontSize: 44 },
  appName: { fontSize: 40, fontWeight: '700', color: '#fff', letterSpacing: -0.8 },
  tagline: { fontSize: 17, color: T.t2, marginTop: 12 },
  bottom: { gap: 16 },
  btn: { width: '100%' },
  signIn: { textAlign: 'center', fontSize: 13, color: T.t2 },
  signInLink: { textDecorationLine: 'underline', color: '#fff' },
});
