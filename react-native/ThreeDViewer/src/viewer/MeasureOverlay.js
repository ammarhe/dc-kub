import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Theme } from '../theme';
import { useViewer } from '../state/ViewerContext';

// Dashed line + endpoints + distance label for the Measure tool.
export default function MeasureOverlay({ width, height }) {
  const { measurePoints, hasTwoPoints, measureLabel } = useViewer();
  if (measurePoints.length === 0) return null;

  const p1 = measurePoints[0];
  const p2 = measurePoints[1];

  return (
    <>
      <Svg width={width} height={height} style={StyleSheet.absoluteFill} pointerEvents="none">
        {hasTwoPoints ? (
          <Line
            x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke={Theme.accent} strokeWidth={2} strokeDasharray="4 4"
          />
        ) : null}
        {p1 ? <Circle cx={p1.x} cy={p1.y} r={5} fill={Theme.accent} /> : null}
        {p2 ? <Circle cx={p2.x} cy={p2.y} r={5} fill={Theme.accent} /> : null}
      </Svg>

      {hasTwoPoints ? (
        <View
          pointerEvents="none"
          style={[
            styles.label,
            { left: (p1.x + p2.x) / 2, top: (p1.y + p2.y) / 2 },
          ]}
        >
          <Text style={styles.labelText}>{measureLabel}</Text>
        </View>
      ) : null}
    </>
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
