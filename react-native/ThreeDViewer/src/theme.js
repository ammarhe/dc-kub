// Color palette translated from the Claude Design source (oklch → sRGB hex),
// kept in one place so the whole app reads from the same tokens.
export const Theme = {
  accent: '#1473CD', // oklch(55% 0.16 250)

  textPrimary: '#23262B', // oklch(18% 0.01 250)
  textSecondary: '#7E8489', // oklch(55% 0.01 250)
  textTertiary: '#A9AEB2', // oklch(70% 0.005 250)
  badgeText: '#565C61', // oklch(38% 0.01 250)
  pillText: '#43484D', // oklch(30% 0.01 250)

  libraryBG: '#F5F6F8',
  viewerBG: '#EDEFF2',
  canvasBG: '#F7F8FA',
  card: '#FFFFFF',
  pillBG: '#F2F2F7',
  badgeBG: '#EAECEF', // oklch(94% 0.01 250)

  border: '#E0E2E5', // oklch(90% 0.005 250)
  separator: '#E6E8EB', // oklch(92% 0.005 250)
  gridDot: '#D8DADE', // oklch(88% 0.006 250)
  handle: '#D8DADE',
  labelBG: '#292C30', // oklch(20% 0.01 250)
};

// Accent with alpha, for the translucent wireframe strokes/fills.
export const accentAlpha = (a) => `rgba(20, 115, 205, ${a})`;
