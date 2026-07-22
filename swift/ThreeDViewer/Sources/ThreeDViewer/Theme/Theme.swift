import SwiftUI

/// Color palette translated from the Claude Design source (oklch values → sRGB).
/// Kept in one place so the whole app reads from the same tokens.
enum Theme {
    // Brand accent — oklch(55% 0.16 250)
    static let accent = Color(hex: 0x1473CD)

    // Text
    static let textPrimary   = Color(hex: 0x23262B) // oklch(18% 0.01 250)
    static let textSecondary = Color(hex: 0x7E8489) // oklch(55% 0.01 250)
    static let textTertiary  = Color(hex: 0xA9AEB2) // oklch(70% 0.005 250)
    static let badgeText     = Color(hex: 0x565C61) // oklch(38% 0.01 250)
    static let pillText      = Color(hex: 0x43484D) // oklch(30% 0.01 250)

    // Surfaces
    static let libraryBG = Color(hex: 0xF5F6F8)
    static let viewerBG  = Color(hex: 0xEDEFF2)
    static let canvasBG  = Color(hex: 0xF7F8FA)
    static let card      = Color.white
    static let pillBG    = Color(hex: 0xF2F2F7)
    static let badgeBG   = Color(hex: 0xEAECEF) // oklch(94% 0.01 250)

    // Lines
    static let border    = Color(hex: 0xE0E2E5) // oklch(90% 0.005 250)
    static let separator = Color(hex: 0xE6E8EB) // oklch(92% 0.005 250)
    static let gridDot   = Color(hex: 0xD8DADE) // oklch(88% 0.006 250)
    static let handle    = Color(hex: 0xD8DADE)
    static let labelBG   = Color(hex: 0x292C30) // oklch(20% 0.01 250)
}

extension Color {
    init(hex: UInt32) {
        self.init(
            .sRGB,
            red:   Double((hex >> 16) & 0xFF) / 255.0,
            green: Double((hex >> 8) & 0xFF) / 255.0,
            blue:  Double(hex & 0xFF) / 255.0,
            opacity: 1.0
        )
    }
}
