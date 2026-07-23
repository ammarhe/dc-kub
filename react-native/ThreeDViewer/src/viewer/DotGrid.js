import React from 'react';
import Svg, { Defs, Pattern, Circle, Rect } from 'react-native-svg';
import { Theme } from '../theme';

// Dotted grid the model sits on (radial-dot background from the source).
export default function DotGrid({ width, height }) {
  return (
    <Svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }} pointerEvents="none">
      <Defs>
        <Pattern id="dots" width={22} height={22} patternUnits="userSpaceOnUse">
          <Circle cx={1} cy={1} r={1} fill={Theme.gridDot} />
        </Pattern>
      </Defs>
      <Rect x={0} y={0} width={width} height={height} fill={Theme.canvasBG} />
      <Rect x={0} y={0} width={width} height={height} fill="url(#dots)" />
    </Svg>
  );
}
