# 3D Viewer App — SwiftUI

A native **SwiftUI** implementation of the *3D Model Viewer* iOS prototype
imported from Claude Design (`3D Viewer App.dc.html`).

It reproduces both screens of the design and all of its interactions:

| Design element | Implementation |
| --- | --- |
| **My Models** library (title, `+`, file count, search bar, file rows) | `Views/LibraryView.swift` |
| Format badges (IFC/OBJ/…) + row meta lines | `FormatBadge`, `ModelFile.metaLine` |
| **Import** bottom sheet (Files / iCloud / AirDrop + supported formats) | `ImportSheet` |
| **Viewer** top bar (back, title, Info, Share) | `Views/ViewerView.swift` |
| 3D wireframe model on a dotted grid | `Views/Model3DView.swift` (hand-rolled perspective projection) |
| **Orbit / Pan / Zoom** via drag | `dragGesture` + `ViewerState.orbit/pan/pinchZoom` |
| **Measure** tool (tap two points → dashed line + distance label + Clear) | `MeasureOverlay`, `SpatialTapGesture` |
| Tool pills + **Reset View** | bottom bar in `ViewerView` |
| **Info** sheet (Format / Size / Details / Added / Export…) | `InfoSheet` |
| **Export As** sheet (format pills, Save to Files / AirDrop / Mail) | `ShareSheet` |
| oklch color palette | `Theme/Theme.swift` |

The camera math, the `/110` measure scaling, the `-18°/35°` default view, the
clamp ranges (`rotX ±80`, `zoom 0.5–2.5`) and every handler match the source
`Component` logic 1:1.

## Requirements

- Xcode 15+, iOS 16.0+ deployment target
  (uses `Layout` and `SpatialTapGesture`, both iOS 16 APIs).

## Build & run

**Option A — XcodeGen (recommended):**

```bash
brew install xcodegen        # if you don't have it
cd swift/ThreeDViewer
xcodegen generate            # creates ThreeDViewer.xcodeproj
open ThreeDViewer.xcodeproj  # ⌘R on an iPhone 16 simulator
```

**Option B — plain Xcode:**

1. File ▸ New ▸ Project ▸ iOS App (SwiftUI), name it `ThreeDViewer`.
2. Delete the generated `ContentView.swift` / `App.swift`.
3. Drag everything under `Sources/ThreeDViewer/` into the project
   (check *Copy items if needed*).
4. Set the deployment target to iOS 16.0 and run.

## Notes

The model is drawn as a stylised wireframe "building" box (floor divisions +
edges) to match the design's look, rendered with a small custom 3D projection
so orbit/pan/zoom map directly onto the camera state. To swap in real geometry,
replace `Model3DView` with a `SceneKit`/`RealityKit` view driven by the same
`ViewerState` camera values.
