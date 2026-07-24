import SwiftUI

/// Model Info sheet.
struct InfoSheet: View {
    @EnvironmentObject var state: ViewerState

    var body: some View {
        let m = state.selected
        VStack(alignment: .leading, spacing: 0) {
            SheetHandle()
            Text("Model Info")
                .font(.system(size: 18, weight: .bold))
                .foregroundStyle(Theme.textPrimary)
                .padding(.bottom, 12)

            infoRow("Format", m.format)
            infoRow("Size", m.size)
            infoRow("Details", m.meta)
            infoRow("Added", m.date, showDivider: false)

            PrimaryButton(title: "Export…") { state.sheet = .share }
                .padding(.top, 16)
        }
        .padding(.horizontal, 20)
        .padding(.top, 20)
        .padding(.bottom, 34)
        .background(Theme.card)
        .clipShape(RoundedCorners(radius: 20, corners: [.topLeft, .topRight]))
    }

    private func infoRow(_ key: String, _ value: String, showDivider: Bool = true) -> some View {
        VStack(spacing: 0) {
            HStack {
                Text(key).foregroundStyle(Theme.textSecondary)
                Spacer()
                Text(value).fontWeight(.semibold).foregroundStyle(Theme.textPrimary)
            }
            .font(.system(size: 15))
            .padding(.vertical, 10)
            if showDivider { Rectangle().fill(Theme.separator).frame(height: 1) }
        }
    }
}

/// Export / Share sheet.
struct ShareSheet: View {
    @EnvironmentObject var state: ViewerState

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            SheetHandle()
            Text("Export As")
                .font(.system(size: 18, weight: .bold))
                .foregroundStyle(Theme.textPrimary)
                .padding(.bottom, 12)

            FlowRow(spacing: 8) {
                ForEach(exportFormats, id: \.self) { fmt in
                    SelectablePill(label: fmt, isActive: fmt == state.exportFormat) {
                        state.exportFormat = fmt
                    }
                }
            }
            .padding(.bottom, 16)

            SheetRow(label: "Save to Files") { state.sheet = nil }
            SheetRow(label: "AirDrop") { state.sheet = nil }
            SheetRow(label: "Mail", showDivider: false) { state.sheet = nil }

            PrimaryButton(title: "Export \(state.exportFormat)") { state.sheet = nil }
                .padding(.top, 16)
            SecondaryButton(title: "Cancel") { state.sheet = nil }
                .padding(.top, 10)
        }
        .padding(.horizontal, 20)
        .padding(.top, 20)
        .padding(.bottom, 34)
        .background(Theme.card)
        .clipShape(RoundedCorners(radius: 20, corners: [.topLeft, .topRight]))
    }
}
