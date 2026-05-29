import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, ScrollView, Pressable, StyleSheet, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import FoodItemRow from '../components/FoodItemRow';
import BgOrbs from '../components/BgOrbs';
import FoodDetailSheet from '../components/FoodDetailSheet';
import { T, PRIMARY_GRAD } from '../theme';
import { LIBRARY, CATEGORIES } from '../data';

const RECENT = [LIBRARY[0], LIBRARY[4], LIBRARY[7], LIBRARY[3]];

export default function LibraryScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);

  const results = useMemo(() => {
    return LIBRARY.filter(
      (f) =>
        (!query || f.name.toLowerCase().includes(query.toLowerCase())) &&
        (!cat || f.cat === cat)
    );
  }, [query, cat]);

  const showRecent = !query && !cat;

  return (
    <View style={styles.bg}>
      <StatusBar style="light" />
      <BgOrbs />
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Library</Text>

          {/* Search bar */}
          <GlassCard radius={16} style={styles.searchBar}>
            <Text style={{ fontSize: 16, color: T.t2 }}>🔍</Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search food or scan barcode"
              placeholderTextColor={T.t3}
              style={styles.searchInput}
            />
            <Text style={{ fontSize: 16, color: T.t2 }}>🎤</Text>
          </GlassCard>

          {/* Category chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.catsScroll}
            contentContainerStyle={styles.catsContent}
          >
            {CATEGORIES.map(([emoji, name]) => {
              const on = cat === name;
              return (
                <Pressable key={name} onPress={() => setCat(on ? null : name)}>
                  {on ? (
                    <LinearGradient
                      colors={PRIMARY_GRAD}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.chip}
                    >
                      <Text style={styles.chipTextOn}>{emoji} {name}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={[styles.chip, styles.chipOff]}>
                      <Text style={styles.chipTextOff}>{emoji} {name}</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </ScrollView>

          {results.length === 0 ? (
            <View style={styles.empty}>
              <Text style={{ fontSize: 48, marginBottom: 16 }}>🔍</Text>
              <Text style={styles.emptyTitle}>No food found</Text>
              <Text style={styles.emptySub}>Try scanning it with your camera instead</Text>
              <Pressable onPress={() => navigation.navigate('Scan')} style={styles.openScannerBtn}>
                <LinearGradient colors={PRIMARY_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.openScannerGrad}>
                  <Text style={styles.openScannerText}>Open Scanner</Text>
                </LinearGradient>
              </Pressable>
            </View>
          ) : (
            <>
              {showRecent && (
                <View style={{ marginBottom: 22 }}>
                  <SectionHeader title="Recently Used" style={{ marginBottom: 12 }} />
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                      {RECENT.map((f) => (
                        <GlassCard key={f.id} radius={18} onPress={() => setSelectedFood(f)} style={styles.recentCard}>
                          <Text style={{ fontSize: 28 }}>{f.emoji}</Text>
                          <Text style={styles.recentName} numberOfLines={1}>{f.name}</Text>
                          <Text style={styles.recentCal}>{f.cal} kcal</Text>
                        </GlassCard>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              )}

              <SectionHeader
                title={cat || (query ? 'Results' : 'All Foods')}
                style={{ marginBottom: 8 }}
              />
              <GlassCard style={{ paddingHorizontal: 14, paddingVertical: 4 }}>
                {results.map((f, i) => (
                  <View key={f.id} style={i < results.length - 1 ? styles.divider : null}>
                    <FoodItemRow
                      food={f}
                      sub={f.cat}
                      right={
                        <Text style={styles.calPer}>
                          {f.cal}
                          <Text style={styles.calPerUnit}> /100g</Text>
                        </Text>
                      }
                      onPress={() => setSelectedFood(f)}
                    />
                  </View>
                ))}
              </GlassCard>
            </>
          )}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>

      <FoodDetailSheet food={selectedFood} onClose={() => setSelectedFood(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: T.bg },
  safe: { flex: 1 },
  scroll: { padding: 20 },
  title: { fontSize: 32, fontWeight: '700', color: '#fff', letterSpacing: -0.6, marginBottom: 16 },
  searchBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  searchInput: { flex: 1, color: '#fff', fontSize: 15 },
  catsScroll: { marginHorizontal: -20, marginBottom: 18 },
  catsContent: { paddingHorizontal: 20, gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999 },
  chipOff: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: T.border },
  chipTextOn: { fontSize: 13, fontWeight: '600', color: '#fff' },
  chipTextOff: { fontSize: 13, fontWeight: '600', color: T.t2 },
  divider: { borderBottomWidth: 1, borderBottomColor: T.border },
  recentCard: { width: 104, padding: 14, alignItems: 'center' },
  recentName: { fontSize: 13, color: '#fff', fontWeight: '500', marginTop: 8 },
  recentCal: { fontSize: 11, color: T.t2, marginTop: 2 },
  calPer: { fontSize: 15, color: '#fff', fontWeight: '600' },
  calPerUnit: { fontSize: 11, color: T.t2, fontWeight: '400' },
  empty: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
  emptyTitle: { fontSize: 20, fontWeight: '600', color: T.t2, marginBottom: 8 },
  emptySub: { fontSize: 15, color: T.t3, textAlign: 'center', marginBottom: 24 },
  openScannerBtn: { borderRadius: 16, overflow: 'hidden' },
  openScannerGrad: { paddingHorizontal: 32, paddingVertical: 16 },
  openScannerText: { fontSize: 15, fontWeight: '600', color: '#fff' },
});
