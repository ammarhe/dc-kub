import React, { useMemo } from 'react';
import Svg, { Line, Polygon } from 'react-native-svg';
import { accentAlpha } from '../theme';

// Box half-extents (width 160, height 220, depth 160 in the source).
const HW = 80;
const HH = 110;
const HD = 80;
const PERSPECTIVE = 900;
const FLOORS = 11;

const rad = (deg) => (deg * Math.PI) / 180;

// Hand-rolled perspective projection so orbit / pan / zoom map directly onto
// the camera state — the same math as the SwiftUI `Model3DView`.
function projectFactory({ rotX, rotY, zoom, panX, panY, cx, cy }) {
  const cyaw = Math.cos(rad(rotY));
  const syaw = Math.sin(rad(rotY));
  const cpit = Math.cos(rad(rotX));
  const spit = Math.sin(rad(rotX));
  return ([x, y, z]) => {
    const x1 = x * cyaw + z * syaw;
    const z1 = -x * syaw + z * cyaw;
    const y2 = y * cpit - z1 * spit;
    const z2 = y * spit + z1 * cpit;
    const s = (PERSPECTIVE / (PERSPECTIVE - z2)) * zoom;
    return [cx + panX + x1 * s, cy + panY + y2 * s];
  };
}

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

export default function Model3D({ width, height, rotX, rotY, zoom, panX, panY }) {
  const { corners, floorRings, topFace, botFace, edges } = useMemo(() => {
    const project = projectFactory({ rotX, rotY, zoom, panX, panY, cx: width / 2, cy: height / 2 });

    const C = [
      [-HW, -HH, HD], [HW, -HH, HD], [HW, HH, HD], [-HW, HH, HD],
      [-HW, -HH, -HD], [HW, -HH, -HD], [HW, HH, -HD], [-HW, HH, -HD],
    ].map(project);

    const topRing = [C[0], C[1], C[5], C[4]];
    const botRing = [C[3], C[2], C[6], C[7]];
    const rings = [];
    for (let f = 1; f < FLOORS; f++) {
      const t = f / FLOORS;
      rings.push(topRing.map((p, i) => lerp(p, botRing[i], t)));
    }

    const edgePairs = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];

    return {
      corners: C,
      floorRings: rings,
      topFace: [C[0], C[1], C[5], C[4]],
      botFace: [C[3], C[2], C[6], C[7]],
      edges: edgePairs,
    };
  }, [width, height, rotX, rotY, zoom, panX, panY]);

  const pts = (ring) => ring.map((p) => `${p[0]},${p[1]}`).join(' ');

  return (
    <Svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }} pointerEvents="none">
      {/* Faint top / bottom face fills */}
      <Polygon points={pts(topFace)} fill={accentAlpha(0.06)} />
      <Polygon points={pts(botFace)} fill={accentAlpha(0.1)} />

      {/* Floor divisions */}
      {floorRings.map((ring, i) => (
        <Polygon key={`floor-${i}`} points={pts(ring)} fill="none" stroke={accentAlpha(0.22)} strokeWidth={1} />
      ))}

      {/* Cube edges */}
      {edges.map(([a, b], i) => (
        <Line
          key={`edge-${i}`}
          x1={corners[a][0]} y1={corners[a][1]}
          x2={corners[b][0]} y2={corners[b][1]}
          stroke={accentAlpha(0.6)} strokeWidth={1.5}
        />
      ))}
    </Svg>
  );
}
