import React from 'react';
import { View } from 'react-native';

// Draws a straight line between two [x, y] points using a single rotated View,
// so we don't need any SVG / canvas dependency.
export default function Line({ a, b, color, width = 1 }) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const length = Math.hypot(dx, dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const cx = (a[0] + b[0]) / 2;
  const cy = (a[1] + b[1]) / 2;

  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: cx - length / 2,
        top: cy - width / 2,
        width: length,
        height: width,
        backgroundColor: color,
        transform: [{ rotate: `${angle}deg` }],
      }}
    />
  );
}
