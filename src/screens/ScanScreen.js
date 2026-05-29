import React, { useState } from 'react';
import {
  View, Text, Pressable, StyleSheet, ScrollView, Modal,
  Dimensions, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import PortionStepper from '../components/PortionStepper';
import MealSelector from '../components/MealSelector';
import { T, PRIMARY_GRAD } from '../theme';
import { SCAN_RESULT } from '../data';

const { width: W, height: H } = Dimensions.get('window');
const GRID_DATA = [
  ['🔥', 'Calories', 'cal', 'kcal'],
  ['🥩', 'Protein', 'p', 'g'],
  ['🌾', 'Carbs', 'c', 'g'],
  ['🥑', 'Fat', 'f', 'g'],
  ['🌿', 'Fiber', 'fiber', 'g'],
  ['🍬', 'Sugar', 'sugar', 'g'],
];

function ScanFrame({ glowing }) {
  return (
    <View style={styles.frame} pointerEvents="none">
      {/* Corner marks */}
      {[
        { top: 0, left: 0 },
        { top: 0, right: 0, transform: [{ scaleX: -1 }] },
        { bottom: 0, left: 0, transform: [{ scaleY: -1 }] },
        { bottom: 0, right: 0, transform: [{ scaleX: -1 }, { scaleY: -1 }] },
      ].map((pos, i) => (
        <View key={i} style={[styles.corner, pos]}>
          <LinearGradient
            colors={PRIMARY_GRAD}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cornerGrad}
          />
        </View>
      ))}
    </View>
  );
}

function ResultSheet({ onClose, onAdd, navigation }) {
  const r = SCAN_RESULT;
  const [portion, setPortion] = useState(r.defaultPortion);
  const [meal, setMeal] = useState('Lunch');
  const k = portion / r.base;
  const m = {
    cal: Math.round(r.cal * k),
    p: Math.round(r.p * k),
    c: Math.round(r.c * k),
    f: Math.round(r.f * k),
    fiber: Math.round(r.fiber * k),
    sugar: Math.round(r.sugar * k),
  };

  return (
    <View style={styles.sheet}>
      <View style={styles.handle} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Text style={styles.resultName}>{r.name}</Text>
          <View style={styles.confidenceBadge}>
            <Text style={styles.confidenceText}>{r.confidence}% confident</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <View style={styles.resultEmoji}>
            <Text style={{ fontSize: 36 }}>{r.emoji}</Text>
          </View>
          <View>
            <Text style={styles.resultCal}>{m.cal} <Text style={{ fontSize: 15 }}>kcal</Text></Text>
            <Text style={{ fontSize: 13, color: T.t2 }}>P {m.p}g · C {m.c}g · F {m.f}g</Text>
          </View>
        </View>
        <View style={styles.macroGrid}>
          {GRID_DATA.map(([emoji, label, key, unit]) => (
            <GlassCard key={label} radius={18} style={styles.gridCell}>
              <Text style={{ fontSize: 18, marginBottom: 2 }}>{emoji}</Text>
              <Text style={styles.gridVal}>{m[key]}<Text style={styles.gridUnit}> {unit}</Text></Text>
              <Text style={styles.gridLabel}>{label}</Text>
            </GlassCard>
          ))}
        </View>
        <View style={{ marginBottom: 18 }}>
          <PortionStepper value={portion} onChange={setPortion} />
        </View>
        <View style={{ marginBottom: 18 }}>
          <MealSelector value={meal} onChange={setMeal} />
        </View>
        <GradientButton onPress={() => { onAdd && onAdd(); onClose(); }}>
          Add to Log
        </GradientButton>
        <Pressable onPress={() => { onClose(); navigation.navigate('Library'); }}>
          <Text style={styles.manualSearch}>Not right? Search manually</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function ErrorSheet({ onRetry, onClose, navigation }) {
  return (
    <View style={styles.sheet}>
      <View style={styles.handle} />
      <View style={{ padding: 24, alignItems: 'center' }}>
        <Text style={{ fontSize: 56, marginBottom: 12 }}>🤔</Text>
        <Text style={styles.errorTitle}>Couldn't identify this food</Text>
        <GlassCard style={styles.tipCard}>
          {[['💡', 'Try better lighting'], ['🔍', 'Get a little closer'], ['🍽️', 'One food at a time']].map(([e, t]) => (
            <View key={t} style={styles.tip}>
              <Text style={{ fontSize: 18 }}>{e}</Text>
              <Text style={{ fontSize: 14, color: T.t2 }}>{t}</Text>
            </View>
          ))}
        </GlassCard>
        <GradientButton onPress={onRetry} style={{ width: '100%', marginBottom: 12 }}>
          Try Again
        </GradientButton>
        <Pressable onPress={() => { onClose(); navigation.navigate('Library'); }}>
          <Text style={styles.manualSearch}>Search Manually</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function ScanScreen({ navigation }) {
  const [state, setState] = useState('camera'); // camera | analyzing | result | error

  const shoot = () => {
    setState('analyzing');
    setTimeout(() => setState('result'), 2200);
  };

  const handleClose = () => navigation.goBack();

  return (
    <View style={styles.bg}>
      <StatusBar style="light" />

      {/* Camera feed placeholder */}
      <View style={styles.camera}>
        <View style={styles.cameraCenter} />
        {Array.from({ length: 8 }).map((_, i) => (
          <View key={i} style={[styles.scanLine, { top: `${i * 14}%` }]} />
        ))}
      </View>

      {/* Scan frame */}
      {(state === 'camera' || state === 'analyzing') && (
        <View style={styles.frameWrap} pointerEvents="none">
          <ScanFrame glowing={state === 'camera'} />
        </View>
      )}

      {/* Top bar */}
      <SafeAreaView style={styles.topBar}>
        <Pressable onPress={handleClose} style={styles.topBtn}>
          <Text style={{ color: '#fff', fontSize: 20 }}>✕</Text>
        </Pressable>
        <Pressable style={styles.topBtn}>
          <Text style={{ color: '#fff', fontSize: 20 }}>⚡</Text>
        </Pressable>
      </SafeAreaView>

      {/* Analyzing overlay */}
      {state === 'analyzing' && (
        <View style={styles.analyzingOverlay}>
          <View style={styles.spinner} />
          <Text style={styles.analyzingText}>Analyzing your food…</Text>
        </View>
      )}

      {/* Bottom overlay */}
      {state === 'camera' && (
        <View style={styles.bottomOverlay}>
          <Text style={styles.hint}>Point your camera at food</Text>
          <Text style={styles.hintSub}>Works best with single dishes</Text>
          <View style={styles.shutterRow}>
            <View style={{ flexDirection: 'row', gap: -8 }}>
              {['🍕', '🥗', '🍜'].map((e, i) => (
                <View key={i} style={[styles.thumbCircle, { marginLeft: i ? -10 : 0 }]}>
                  <Text style={{ fontSize: 16 }}>{e}</Text>
                </View>
              ))}
            </View>
            <Pressable onPress={shoot} style={styles.shutter}>
              <LinearGradient colors={PRIMARY_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.shutterInner}>
                <Text style={{ fontSize: 24 }}>📷</Text>
              </LinearGradient>
            </Pressable>
            <View style={{ width: 58 }} />
          </View>
        </View>
      )}

      {/* Result sheet */}
      {state === 'result' && (
        <View style={StyleSheet.absoluteFill}>
          <Pressable style={{ flex: 1 }} onPress={() => setState('camera')} />
          <ResultSheet
            onClose={() => setState('camera')}
            navigation={navigation}
          />
        </View>
      )}

      {/* Error sheet */}
      {state === 'error' && (
        <View style={StyleSheet.absoluteFill}>
          <Pressable style={{ flex: 1 }} onPress={() => setState('camera')} />
          <ErrorSheet
            onRetry={() => { setState('analyzing'); setTimeout(() => setState('result'), 2000); }}
            onClose={() => setState('camera')}
            navigation={navigation}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#0a0d14' },
  camera: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0a0d14',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cameraCenter: {
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  scanLine: {
    position: 'absolute', left: 0, right: 0, height: 1,
    backgroundColor: 'rgba(255,255,255,0.015)',
  },
  topBar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', padding: 18,
  },
  topBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  frameWrap: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
  },
  frame: {
    width: 260, height: 260,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 34, height: 34,
  },
  cornerGrad: {
    width: 4, height: 34,
    borderRadius: 2,
  },
  analyzingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5,7,13,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 22,
  },
  spinner: {
    width: 80, height: 80, borderRadius: 40,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.1)',
    borderTopColor: '#7C3AED',
    borderRightColor: '#06B6D4',
  },
  analyzingText: { fontSize: 16, color: '#fff', fontWeight: '500' },
  bottomOverlay: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    height: 168,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 26,
    gap: 4,
  },
  hint: { fontSize: 16, color: '#fff', fontWeight: '500' },
  hintSub: { fontSize: 13, color: T.t2, marginBottom: 14 },
  shutterRow: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  thumbCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(5,7,13,0.9)',
  },
  shutter: {
    width: 72, height: 72, borderRadius: 36,
    borderWidth: 4, borderColor: 'rgba(255,255,255,0.85)',
    overflow: 'hidden',
  },
  shutterInner: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  sheet: {
    backgroundColor: 'rgba(18,20,32,0.98)',
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    borderWidth: 1, borderColor: T.border,
    maxHeight: H * 0.75,
  },
  handle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: T.t3,
    alignSelf: 'center',
    marginTop: 12, marginBottom: 4,
  },
  resultName: { fontSize: 22, fontWeight: '600', color: '#fff', flex: 1, letterSpacing: -0.4 },
  confidenceBadge: {
    backgroundColor: 'rgba(16,185,129,0.15)',
    borderWidth: 1, borderColor: 'rgba(16,185,129,0.3)',
    borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4,
  },
  confidenceText: { fontSize: 12, fontWeight: '600', color: T.success },
  resultEmoji: {
    width: 72, height: 72, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1, borderColor: T.border,
    alignItems: 'center', justifyContent: 'center',
  },
  resultCal: { fontSize: 32, fontWeight: '700', color: '#7C3AED' },
  macroGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 18 },
  gridCell: { width: '47%', padding: 14, flexDirection: 'column', alignItems: 'flex-start' },
  gridVal: { fontSize: 17, fontWeight: '700', color: '#fff' },
  gridUnit: { fontSize: 11, fontWeight: '400', color: T.t2 },
  gridLabel: { fontSize: 11, color: T.t2 },
  manualSearch: { textAlign: 'center', color: T.t2, fontSize: 14, marginTop: 14, paddingVertical: 8 },
  errorTitle: { fontSize: 21, fontWeight: '600', color: '#fff', textAlign: 'center', marginBottom: 16 },
  tipCard: { padding: 16, width: '100%', marginBottom: 20, gap: 12 },
  tip: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});
