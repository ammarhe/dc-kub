import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '../components/BottomSheet';
import { SheetHandle, SheetRow, Pill, PrimaryButton, SecondaryButton } from '../components/UI';
import { Theme } from '../theme';
import { EXPORT_FORMATS } from '../data';
import { useViewer } from '../state/ViewerContext';

export default function ShareSheet() {
  const { sheet, setSheet, exportFormat, setExportFormat } = useViewer();
  const dismiss = () => setSheet(null);

  return (
    <BottomSheet visible={sheet === 'share'} onDismiss={dismiss}>
      <SheetHandle />
      <Text style={styles.title}>Export As</Text>

      <View style={styles.formats}>
        {EXPORT_FORMATS.map((fmt) => (
          <Pill key={fmt} label={fmt} active={fmt === exportFormat} onPress={() => setExportFormat(fmt)} />
        ))}
      </View>

      <SheetRow label="Save to Files" onPress={dismiss} />
      <SheetRow label="AirDrop" onPress={dismiss} />
      <SheetRow label="Mail" showDivider={false} onPress={dismiss} />

      <View style={{ marginTop: 16 }}>
        <PrimaryButton title={`Export ${exportFormat}`} onPress={dismiss} />
      </View>
      <View style={{ marginTop: 10 }}>
        <SecondaryButton title="Cancel" onPress={dismiss} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700', color: Theme.textPrimary, marginBottom: 12 },
  formats: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
});
