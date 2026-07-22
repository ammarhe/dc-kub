import SwiftUI

/// A small 3D vector + the projection math used to draw the wireframe model.
private struct Vec3 { var x, y, z: Double }

/// Renders the stylised wireframe "building" box from the design: a box with
/// floor divisions, drawn with a hand-rolled perspective projection so that
/// orbit / pan / zoom map directly onto the camera state.
struct Model3DView: View {
    var rotX: Double
    var rotY: Double
    var zoom: Double
    var panX: Double
    var panY: Double

    // Box half-extents (width 160, height 220, depth 160 in the source).
    private let hw = 80.0   // half width  (x)
    private let hh = 110.0  // half height (y)
    private let hd = 80.0   // half depth  (z)
    private let perspective = 900.0
    private let floors = 11

    var body: some View {
        Canvas { ctx, size in
            let center = CGPoint(x: size.width / 2 + panX, y: size.height / 2 + panY)

            func project(_ v: Vec3) -> CGPoint {
                // rotateY then rotateX (right-to-left, as in the CSS transform)
                let cy = cos(rad(rotY)), sy = sin(rad(rotY))
                let x1 = v.x * cy + v.z * sy
                let z1 = -v.x * sy + v.z * cy
                let cx = cos(rad(rotX)), sx = sin(rad(rotX))
                let y2 = v.y * cx - z1 * sx
                let z2 = v.y * sx + z1 * cx
                let s = perspective / (perspective - z2) * zoom
                return CGPoint(x: center.x + x1 * s, y: center.y + y2 * s)
            }

            // 8 corners
            let corners = [
                Vec3(x: -hw, y: -hh, z:  hd), Vec3(x:  hw, y: -hh, z:  hd),
                Vec3(x:  hw, y:  hh, z:  hd), Vec3(x: -hw, y:  hh, z:  hd),
                Vec3(x: -hw, y: -hh, z: -hd), Vec3(x:  hw, y: -hh, z: -hd),
                Vec3(x:  hw, y:  hh, z: -hd), Vec3(x: -hw, y:  hh, z: -hd),
            ].map(project)

            let accent = Theme.accent

            // Faint top / bottom face fills.
            var top = Path(); top.addLines([corners[0], corners[1], corners[5], corners[4]]); top.closeSubpath()
            var bot = Path(); bot.addLines([corners[3], corners[2], corners[6], corners[7]]); bot.closeSubpath()
            ctx.fill(top, with: .color(accent.opacity(0.06)))
            ctx.fill(bot, with: .color(accent.opacity(0.10)))

            // Floor divisions on the four vertical faces.
            let topRing = [corners[0], corners[1], corners[5], corners[4]]
            let botRing = [corners[3], corners[2], corners[6], corners[7]]
            for f in 1..<floors {
                let t = Double(f) / Double(floors)
                var ring = Path()
                for i in 0..<4 {
                    let a = lerp(topRing[i], botRing[i], t)
                    if i == 0 { ring.move(to: a) } else { ring.addLine(to: a) }
                }
                ring.closeSubpath()
                ctx.stroke(ring, with: .color(accent.opacity(0.22)), lineWidth: 1)
            }

            // Cube edges.
            let edges: [(Int, Int)] = [
                (0,1),(1,2),(2,3),(3,0), // front
                (4,5),(5,6),(6,7),(7,4), // back
                (0,4),(1,5),(2,6),(3,7), // connectors
            ]
            var wire = Path()
            for (a, b) in edges { wire.move(to: corners[a]); wire.addLine(to: corners[b]) }
            ctx.stroke(wire, with: .color(accent.opacity(0.6)), lineWidth: 1.5)
        }
        .drawingGroup()
    }

    private func rad(_ deg: Double) -> Double { deg * .pi / 180 }
    private func lerp(_ a: CGPoint, _ b: CGPoint, _ t: Double) -> CGPoint {
        CGPoint(x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t)
    }
}

/// The dotted grid the model sits on.
struct DotGridBackground: View {
    var body: some View {
        Canvas { ctx, size in
            let step = 22.0, r = 1.0
            var x = 0.0
            while x < size.width {
                var y = 0.0
                while y < size.height {
                    let rect = CGRect(x: x - r, y: y - r, width: 2 * r, height: 2 * r)
                    ctx.fill(Path(ellipseIn: rect), with: .color(Theme.gridDot))
                    y += step
                }
                x += step
            }
        }
        .background(Theme.canvasBG)
    }
}
