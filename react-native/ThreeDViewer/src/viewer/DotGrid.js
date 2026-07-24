import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Theme } from '../theme';

const STEP = 22;
const DOT = 2;

// Dotted grid the model sits on, built from plain Views (no SVG).
export default function DotGrid({ width, height }) {
  const dots = useMemo(() => {
    const out = [];
    for (let y = 0; y < height; y += STEP) {
      for (let x = 0; x < width; x += STEP) {
        out.push({ x, y });
      }
    }
    return out;
  }, [width, height]);

  return (
    <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, width, height, backgroundColor: Theme.canvasBG }}>
      {dots.map((d, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: d.x,
            top: d.y,
            width: DOT,
            height: DOT,
            borderRadius: DOT / 2,
            backgroundColor: Theme.gridDot,
          }}
        />
      ))}
    </View>
  );
}
