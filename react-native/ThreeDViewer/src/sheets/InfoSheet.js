import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '../components/BottomSheet';
import { SheetHandle, PrimaryButton } from '../components/UI';
import { Theme } from '../theme';
import { useViewer } from '../state/ViewerContext';

function InfoRow({ label, value, showDivider = true }) {
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.key}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      {showDivider ? <View style={styles.divider} /> : null}
    </View>
  );
}

export default function InfoSheet() {
  const { sheet, setSheet, selected } = useViewer();

  return (
    <BottomSheet visible={sheet === 'info'} onDismiss={() => setSheet(null)}>
      <SheetHandle />
      <Text style={styles.title}>Model Info</Text>
      <InfoRow label="Format" value={selected.format} />
      <InfoRow label="Size" value={selected.size} />
      <InfoRow label="Details" value={selected.meta} />
      <InfoRow label="Added" value={selected.date} showDivider={false} />
      <View style={{ marginTop: 16 }}>
        <PrimaryButton title="Export…" onPress={() => setSheet('share')} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700', color: Theme.textPrimary, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  key: { fontSize: 15, color: Theme.textSecondary },
  value: { fontSize: 15, fontWeight: '600', color: Theme.textPrimary },
  divider: { height: 1, backgroundColor: Theme.separator },
});
