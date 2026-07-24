import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Line from '../components/Line';
import { Theme } from '../theme';
import { useViewer } from '../state/ViewerContext';

// Measure line + endpoints + distance label, drawn with plain Views (no SVG).
export default function MeasureOverlay({ width, height }) {
  const { measurePoints, hasTwoPoints, measureLabel } = useViewer();
  if (measurePoints.length === 0) return null;

  const p1 = measurePoints[0];
  const p2 = measurePoints[1];

  return (
    <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, width, height }}>
      {hasTwoPoints ? <Line a={[p1.x, p1.y]} b={[p2.x, p2.y]} color={Theme.accent} width={2} /> : null}

      {p1 ? <Dot x={p1.x} y={p1.y} /> : null}
      {p2 ? <Dot x={p2.x} y={p2.y} /> : null}

      {hasTwoPoints ? (
        <View style={[styles.label, { left: (p1.x + p2.x) / 2, top: (p1.y + p2.y) / 2 }]}>
          <Text style={styles.labelText}>{measureLabel}</Text>
        </View>
      ) : null}
    </View>
  );
}

function Dot({ x, y }) {
  return (
    <View
      style={{
        position: 'absolute',
        left: x - 5,
        top: y - 5,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Theme.accent,
      }}
    />
  );
}

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    transform: [{ translateX: -28 }, { translateY: -12 }],
    backgroundColor: Theme.labelBG,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  labelText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});
