import SwiftUI

struct ViewerView: View {
    @EnvironmentObject var state: ViewerState

    // Track the previous drag translation so we can feed per-frame deltas
    // (orbit/pan/zoom in the source all work on deltas, not absolute values).
    @State private var lastTranslation: CGSize = .zero

    var body: some View {
        VStack(spacing: 0) {
            topBar
            canvas
            bottomBar
        }
        .background(Theme.viewerBG)
    }

    // MARK: Top bar

    private var topBar: some View {
        HStack(spacing: 10) {
            Button { state.backToLibrary() } label: {
                Text("‹")
                    .font(.system(size: 26))
                    .foregroundStyle(Theme.textPrimary)
                    .frame(width: 36, height: 36)
            }
            .buttonStyle(.plain)

            Text(state.selected.name)
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(Theme.textPrimary)
                .lineLimit(1)
                .truncationMode(.tail)
                .frame(maxWidth: .infinity)

            headerChip("Info") { state.sheet = .info }
            headerChip("Share") { state.sheet = .share }
        }
        .padding(.top, 60)
        .padding(.horizontal, 12)
        .padding(.bottom, 10)
        .background(
            Theme.card
                .overlay(alignment: .bottom) { Rectangle().fill(Theme.border).frame(height: 1) }
        )
    }

    private func headerChip(_ title: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 13, weight: .semibold))
                .foregroundStyle(Theme.textPrimary)
                .padding(.vertical, 7)
                .padding(.horizontal, 12)
                .background(Theme.pillBG)
                .clipShape(RoundedRectangle(cornerRadius: 8))
        }
        .buttonStyle(.plain)
    }

    // MARK: 3D canvas

    private var canvas: some View {
        GeometryReader { _ in
            ZStack {
                DotGridBackground()

                Model3DView(rotX: state.rotX, rotY: state.rotY,
                            zoom: state.zoom, panX: state.panX, panY: state.panY)
                    .allowsHitTesting(false)

                MeasureOverlay()

                // Tool hints / clear button
                if state.activeTool == .measure && !state.hasTwoPoints {
                    hintCard("Tap two points to measure")
                        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
                        .padding(12)
                }
                if state.hasTwoPoints {
                    Button { state.clearMeasure() } label: {
                        hintCard("Clear")
                    }
                    .buttonStyle(.plain)
                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topTrailing)
                    .padding(12)
                }
            }
            .contentShape(Rectangle())
            .gesture(dragGesture)
            .gesture(measureTapGesture)
        }
        .clipped()
    }

    private func hintCard(_ text: String) -> some View {
        Text(text)
            .font(.system(size: 12, weight: .semibold))
            .foregroundStyle(Theme.textSecondary)
            .padding(.vertical, 6)
            .padding(.horizontal, 10)
            .background(Theme.card)
            .clipShape(RoundedRectangle(cornerRadius: 8))
            .shadow(color: .black.opacity(0.1), radius: 3, y: 1)
    }

    // MARK: Gestures

    private var dragGesture: some Gesture {
        DragGesture(minimumDistance: 1)
            .onChanged { value in
                guard state.activeTool != .measure else { return }
                let dx = value.translation.width - lastTranslation.width
                let dy = value.translation.height - lastTranslation.height
                lastTranslation = value.translation
                switch state.activeTool {
                case .orbit: state.orbit(dx: dx, dy: dy)
                case .pan:   state.pan(dx: dx, dy: dy)
                case .zoom:  state.pinchZoom(dy: dy)
                case .measure: break
                }
            }
            .onEnded { _ in lastTranslation = .zero }
    }

    private var measureTapGesture: some Gesture {
        SpatialTapGesture()
            .onEnded { value in
                guard state.activeTool == .measure else { return }
                state.addMeasurePoint(value.location)
            }
    }

    // MARK: Bottom bar

    private var bottomBar: some View {
        VStack(spacing: 8) {
            HStack(spacing: 8) {
                ForEach(ViewerTool.allCases) { tool in
                    SelectablePill(label: tool.label,
                                   isActive: tool == state.activeTool,
                                   fillWidth: true) {
                        state.setTool(tool)
                    }
                }
            }
            Button { state.resetView() } label: {
                Text("Reset View")
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundStyle(Theme.accent)
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.plain)
        }
        .padding(.horizontal, 16)
        .padding(.top, 10)
        .padding(.bottom, 6)
        .background(
            Theme.card
                .overlay(alignment: .top) { Rectangle().fill(Theme.border).frame(height: 1) }
        )
    }
}

/// SVG measure overlay: dashed line, endpoints, and the distance label.
struct MeasureOverlay: View {
    @EnvironmentObject var state: ViewerState

    var body: some View {
        ZStack {
            if state.hasTwoPoints {
                let p1 = state.measurePoints[0]
                let p2 = state.measurePoints[1]
                Path { p in p.move(to: p1); p.addLine(to: p2) }
                    .stroke(Theme.accent, style: StrokeStyle(lineWidth: 2, dash: [4, 4]))
                dot(at: p1); dot(at: p2)
                Text(state.measureLabel)
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundStyle(.white)
                    .padding(.vertical, 4)
                    .padding(.horizontal, 8)
                    .background(Theme.labelBG)
                    .clipShape(RoundedRectangle(cornerRadius: 6))
                    .position(x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2)
            } else {
                ForEach(Array(state.measurePoints.enumerated()), id: \.offset) { _, p in
                    dot(at: p)
                }
            }
        }
        .allowsHitTesting(false)
    }

    private func dot(at p: CGPoint) -> some View {
        Circle().fill(Theme.accent).frame(width: 10, height: 10).position(p)
    }
}
