import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { Theme } from '../theme';

const monoFont = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

// Monospace format badge (IFC / OBJ / …) on library rows.
export function FormatBadge({ text }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
}

// Selectable pill — tools row (fillWidth) and export-format chips.
export function Pill({ label, active, fillWidth, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.pill,
        fillWidth ? styles.pillFill : styles.pillAuto,
        { backgroundColor: active ? Theme.accent : Theme.pillBG },
      ]}
    >
      <Text
        style={[
          fillWidth ? styles.pillTextFill : styles.pillTextAuto,
          { color: active ? '#fff' : Theme.pillText },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

// Grab handle for bottom sheets.
export function SheetHandle() {
  return <View style={styles.handle} />;
}

// Tappable sheet row (label + chevron) with optional divider.
export function SheetRow({ label, showDivider = true, onPress }) {
  return (
    <View>
      <Pressable onPress={onPress} style={styles.sheetRow}>
        <Text style={styles.sheetRowLabel}>{label}</Text>
        <Text style={styles.chevronMuted}>›</Text>
      </Pressable>
      {showDivider ? <View style={styles.divider} /> : null}
    </View>
  );
}

export function PrimaryButton({ title, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.primaryBtn}>
      <Text style={styles.primaryBtnText}>{title}</Text>
    </Pressable>
  );
}

export function SecondaryButton({ title, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.secondaryBtn}>
      <Text style={styles.secondaryBtnText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 54,
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: Theme.badgeBG,
    borderRadius: 6,
  },
  badgeText: { fontSize: 12, fontWeight: '700', letterSpacing: 0.24, color: Theme.badgeText, fontFamily: monoFont },

  pill: { alignItems: 'center', justifyContent: 'center' },
  pillFill: { flex: 1, paddingVertical: 10, borderRadius: 10 },
  pillAuto: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  pillTextFill: { fontSize: 13, fontWeight: '600' },
  pillTextAuto: { fontSize: 14, fontWeight: '600' },

  handle: { width: 36, height: 5, borderRadius: 3, backgroundColor: Theme.handle, alignSelf: 'center', marginBottom: 16 },

  sheetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 2,
  },
  sheetRowLabel: { fontSize: 16, color: Theme.textPrimary },
  chevronMuted: { color: Theme.textTertiary, fontSize: 16 },
  divider: { height: 1, backgroundColor: Theme.separator },

  primaryBtn: { paddingVertical: 13, borderRadius: 12, backgroundColor: Theme.accent, alignItems: 'center' },
  primaryBtnText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  secondaryBtn: { paddingVertical: 12, borderRadius: 12, backgroundColor: Theme.pillBG, alignItems: 'center' },
  secondaryBtnText: { fontSize: 16, fontWeight: '600', color: Theme.textPrimary },
});
