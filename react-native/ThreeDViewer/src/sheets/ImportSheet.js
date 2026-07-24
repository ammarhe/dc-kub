import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '../components/BottomSheet';
import { SheetHandle, SheetRow, SecondaryButton } from '../components/UI';
import { Theme } from '../theme';
import { useViewer } from '../state/ViewerContext';

export default function ImportSheet() {
  const { sheet, setSheet } = useViewer();
  const dismiss = () => setSheet(null);

  return (
    <BottomSheet visible={sheet === 'import'} onDismiss={dismiss}>
      <SheetHandle />
      <Text style={styles.title}>Import Model</Text>
      <SheetRow label="Files App" onPress={dismiss} />
      <SheetRow label="iCloud Drive" onPress={dismiss} />
      <SheetRow label="AirDrop" showDivider={false} onPress={dismiss} />
      <Text style={styles.support}>Supports OBJ · FBX · IFC · 3DS · STL · glTF/GLB</Text>
      <View style={{ marginTop: 16 }}>
        <SecondaryButton title="Cancel" onPress={dismiss} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700', color: Theme.textPrimary, marginBottom: 10 },
  support: { fontSize: 12, color: Theme.textSecondary, marginTop: 12 },
});
