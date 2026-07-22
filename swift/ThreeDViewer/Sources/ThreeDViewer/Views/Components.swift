import SwiftUI

/// Monospace format badge (IFC / OBJ / …) shown on library rows.
struct FormatBadge: View {
    let text: String
    var body: some View {
        Text(text)
            .font(.system(size: 12, weight: .bold, design: .monospaced))
            .kerning(0.24)
            .foregroundStyle(Theme.badgeText)
            .frame(minWidth: 54)
            .padding(.vertical, 4)
            .padding(.horizontal, 6)
            .background(Theme.badgeBG)
            .clipShape(RoundedRectangle(cornerRadius: 6))
    }
}

/// A selectable pill (tools row / export formats).
struct SelectablePill: View {
    let label: String
    let isActive: Bool
    var fillWidth: Bool = false
    var action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(label)
                .font(.system(size: fillWidth ? 13 : 14, weight: .semibold))
                .foregroundStyle(isActive ? .white : Theme.pillText)
                .frame(maxWidth: fillWidth ? .infinity : nil)
                .padding(.vertical, fillWidth ? 10 : 8)
                .padding(.horizontal, fillWidth ? 0 : 14)
                .background(isActive ? Theme.accent : Theme.pillBG)
                .clipShape(RoundedRectangle(cornerRadius: fillWidth ? 10 : 8))
        }
        .buttonStyle(.plain)
    }
}

/// Grab handle at the top of a bottom sheet.
struct SheetHandle: View {
    var body: some View {
        Capsule()
            .fill(Theme.handle)
            .frame(width: 36, height: 5)
            .frame(maxWidth: .infinity)
            .padding(.bottom, 16)
    }
}

/// A tappable row inside a sheet (label + chevron), optionally with a bottom divider.
struct SheetRow: View {
    let label: String
    var showDivider: Bool = true
    var action: () -> Void

    var body: some View {
        VStack(spacing: 0) {
            Button(action: action) {
                HStack {
                    Text(label)
                        .font(.system(size: 16))
                        .foregroundStyle(Theme.textPrimary)
                    Spacer()
                    Text("›").foregroundStyle(Theme.textTertiary)
                }
                .padding(.vertical, 13)
                .padding(.horizontal, 2)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            if showDivider {
                Rectangle().fill(Theme.separator).frame(height: 1)
            }
        }
    }
}

/// Solid accent CTA button used in sheets.
struct PrimaryButton: View {
    let title: String
    var action: () -> Void
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(.white)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 13)
                .background(Theme.accent)
                .clipShape(RoundedRectangle(cornerRadius: 12))
        }
        .buttonStyle(.plain)
    }
}

/// Neutral secondary button (Cancel).
struct SecondaryButton: View {
    let title: String
    var action: () -> Void
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(Theme.textPrimary)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 12)
                .background(Theme.pillBG)
                .clipShape(RoundedRectangle(cornerRadius: 12))
        }
        .buttonStyle(.plain)
    }
}
