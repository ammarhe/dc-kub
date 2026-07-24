# 3D Viewer App — React Native (Expo)

A **React Native (Expo)** implementation of the *3D Model Viewer* iOS prototype
imported from Claude Design (`3D Viewer App.dc.html`).

**Why Expo:** the app is self-contained UI with no custom native modules, so
Expo gives zero-config `npx expo start` on iOS / Android / web. The wireframe
model, dotted grid, and measure overlay are drawn with plain React Native
`View`s + transforms (a rotated-View `Line` primitive), so there is **no SVG /
canvas dependency** — the only extra package is `react-native-safe-area-context`,
which ships with Expo. Nothing here needs the bare/native workflow.

## Features (1:1 with the design)

| Design element | Implementation |
| --- | --- |
| **My Models** library (title, `+`, count, search, file rows, format badges) | `src/screens/LibraryScreen.js` |
| **Import** bottom sheet (Files / iCloud / AirDrop + supported formats) | `src/sheets/ImportSheet.js` |
| **Viewer** top bar (back, title, Info, Share) | `src/screens/ViewerScreen.js` |
| 3D wireframe model on a dotted grid | `src/viewer/Model3D.js`, `src/viewer/DotGrid.js` (plain Views) |
| **Orbit / Pan / Zoom** via drag | `PanResponder` → `orbit/pan/pinchZoom` |
| **Measure** tool (tap two points → dashed line + distance + Clear) | `src/viewer/MeasureOverlay.js` |
| Tool pills + **Reset View** | bottom bar in `ViewerScreen` |
| **Info** sheet + **Export As** sheet | `src/sheets/InfoSheet.js`, `ShareSheet.js` |
| oklch palette | `src/theme.js` |

Camera defaults (`-18° / 35°`), clamp ranges (`rotX ±80`, `zoom 0.5–2.5`),
and the `/110` measure scale match the source `Component` logic exactly. The
wireframe box uses a hand-rolled perspective projection (`Model3D.js`) so the
tools drive the camera directly — identical math to the SwiftUI version.

## Run it

```bash
cd react-native/ThreeDViewer
npm install          # or: npx expo install
npx expo start       # press i (iOS), a (Android), or w (web)
```

`npm install` pins Expo SDK 51 versions. If you use a different SDK, run
`npx expo install react-native-safe-area-context` so the native module matches
your Expo runtime.

## Notes

The model is drawn as a stylised wireframe "building" box to match the
design's look. To load real geometry, swap `Model3D` for an
`expo-gl` + `three.js` (`expo-three`) renderer driven by the same
`ViewerContext` camera values.
