import SwiftUI

/// Which top-level screen is showing.
enum Screen { case library, viewer }

/// Which bottom sheet is presented (only one at a time).
enum ActiveSheet: Identifiable {
    case importModel, info, share
    var id: Int { hashValue }
}

/// Central app state — mirrors the `state` object + handlers in the design source.
@MainActor
final class ViewerState: ObservableObject {
    // Navigation
    @Published var screen: Screen = .library
    @Published var selectedId: Int = 1
    @Published var sheet: ActiveSheet?

    // Viewer tools / camera
    @Published var activeTool: ViewerTool = .orbit
    @Published var rotX: Double = -18
    @Published var rotY: Double = 35
    @Published var zoom: Double = 1
    @Published var panX: Double = 0
    @Published var panY: Double = 0

    // Measure tool: up to two points in canvas-local coordinates
    @Published var measurePoints: [CGPoint] = []

    // Export
    @Published var exportFormat: String = "OBJ"

    let files = ModelFile.samples

    var selected: ModelFile {
        files.first { $0.id == selectedId } ?? files[0]
    }

    var hasTwoPoints: Bool { measurePoints.count == 2 }

    /// Distance label — pixel distance scaled by /110, matching the source.
    var measureLabel: String {
        guard measurePoints.count == 2 else { return "" }
        let p1 = measurePoints[0], p2 = measurePoints[1]
        let dist = hypot(p2.x - p1.x, p2.y - p1.y)
        return String(format: "%.2f m", dist / 110)
    }

    // MARK: - Actions

    func openFile(_ id: Int) {
        selectedId = id
        activeTool = .orbit
        resetView()
        measurePoints = []
        screen = .viewer
    }

    func backToLibrary() { screen = .library }

    func setTool(_ tool: ViewerTool) {
        activeTool = tool
        measurePoints = []
    }

    func resetView() {
        rotX = -18; rotY = 35; zoom = 1; panX = 0; panY = 0
    }

    func clearMeasure() { measurePoints = [] }

    func addMeasurePoint(_ p: CGPoint) {
        if measurePoints.count >= 2 { measurePoints = [] }
        measurePoints.append(p)
    }

    // Drag handling (deltas from a gesture)
    func orbit(dx: Double, dy: Double) {
        rotY += dx * 0.5
        rotX = clampd(rotX - dy * 0.5, -80, 80)
    }
    func pan(dx: Double, dy: Double) {
        panX += dx; panY += dy
    }
    func pinchZoom(dy: Double) {
        zoom = clampd(zoom - dy * 0.006, 0.5, 2.5)
    }

    private func clampd(_ v: Double, _ lo: Double, _ hi: Double) -> Double {
        max(lo, min(hi, v))
    }
}
