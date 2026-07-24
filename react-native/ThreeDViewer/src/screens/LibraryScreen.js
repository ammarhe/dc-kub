import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '../theme';
import { FILES, metaLine } from '../data';
import { FormatBadge } from '../components/UI';
import { useViewer } from '../state/ViewerContext';

export default function LibraryScreen() {
  const { openFile, setSheet } = useViewer();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) + 12 }]}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>My Models</Text>
          <Pressable style={styles.addBtn} onPress={() => setSheet('import')}>
            <Text style={styles.addBtnText}>+</Text>
          </Pressable>
        </View>
        <Text style={styles.count}>{FILES.length} files</Text>
        <View style={styles.search}>
          <Text style={styles.searchText}>Search models</Text>
        </View>
      </View>

      {/* File list */}
      <ScrollView contentContainerStyle={styles.list}>
        {FILES.map((file) => (
          <Pressable key={file.id} style={styles.card} onPress={() => openFile(file.id)}>
            <FormatBadge text={file.format} />
            <View style={styles.cardBody}>
              <Text style={styles.cardName} numberOfLines={1}>{file.name}</Text>
              <Text style={styles.cardMeta} numberOfLines={1}>{metaLine(file)}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Theme.libraryBG },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    backgroundColor: Theme.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.border,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 30, fontWeight: '700', letterSpacing: -0.3, color: Theme.textPrimary },
  addBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Theme.accent, alignItems: 'center', justifyContent: 'center' },
  addBtnText: { color: '#fff', fontSize: 22, lineHeight: 24 },
  count: { fontSize: 14, color: Theme.textSecondary, marginTop: 4 },
  search: {
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.border,
    backgroundColor: Theme.libraryBG,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginTop: 14,
  },
  searchText: { fontSize: 15, color: Theme.textTertiary },

  list: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 24 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Theme.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cardBody: { flex: 1, minWidth: 0 },
  cardName: { fontSize: 16, fontWeight: '600', color: Theme.textPrimary },
  cardMeta: { fontSize: 13, color: Theme.textSecondary, marginTop: 2 },
  chevron: { fontSize: 18, color: Theme.textTertiary },
});
