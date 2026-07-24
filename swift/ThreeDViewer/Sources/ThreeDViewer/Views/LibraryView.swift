import SwiftUI

struct LibraryView: View {
    @EnvironmentObject var state: ViewerState

    var body: some View {
        VStack(spacing: 0) {
            header
            ScrollView {
                LazyVStack(spacing: 10) {
                    ForEach(state.files) { file in
                        row(file)
                    }
                }
                .padding(.horizontal, 16)
                .padding(.top, 14)
                .padding(.bottom, 24)
            }
        }
        .background(Theme.libraryBG)
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text("My Models")
                    .font(.system(size: 30, weight: .bold))
                    .kerning(-0.3)
                    .foregroundStyle(Theme.textPrimary)
                Spacer()
                Button { state.sheet = .importModel } label: {
                    Text("+")
                        .font(.system(size: 22, weight: .regular))
                        .foregroundStyle(.white)
                        .frame(width: 40, height: 40)
                        .background(Theme.accent)
                        .clipShape(Circle())
                }
                .buttonStyle(.plain)
            }
            Text("\(state.files.count) files")
                .font(.system(size: 14))
                .foregroundStyle(Theme.textSecondary)
                .padding(.top, 4)

            HStack {
                Text("Search models")
                    .font(.system(size: 15))
                    .foregroundStyle(Theme.textTertiary)
                Spacer()
            }
            .padding(.horizontal, 12)
            .frame(height: 40)
            .background(Theme.libraryBG)
            .overlay(RoundedRectangle(cornerRadius: 12).stroke(Theme.border, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .padding(.top, 14)
        }
        .padding(.top, 64)
        .padding(.horizontal, 20)
        .padding(.bottom, 14)
        .background(
            Theme.card
                .overlay(alignment: .bottom) { Rectangle().fill(Theme.border).frame(height: 1) }
        )
    }

    private func row(_ file: ModelFile) -> some View {
        Button { state.openFile(file.id) } label: {
            HStack(spacing: 12) {
                FormatBadge(text: file.format)
                VStack(alignment: .leading, spacing: 2) {
                    Text(file.name)
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundStyle(Theme.textPrimary)
                        .lineLimit(1)
                        .truncationMode(.tail)
                    Text(file.metaLine)
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.textSecondary)
                        .lineLimit(1)
                }
                Spacer(minLength: 0)
                Text("›")
                    .font(.system(size: 18))
                    .foregroundStyle(Theme.textTertiary)
            }
            .padding(14)
            .background(Theme.card)
            .clipShape(RoundedRectangle(cornerRadius: 14))
            .shadow(color: .black.opacity(0.04), radius: 1, y: 1)
        }
        .buttonStyle(.plain)
    }
}

/// Import sheet (Files App / iCloud Drive / AirDrop + supported formats).
struct ImportSheet: View {
    @EnvironmentObject var state: ViewerState

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            SheetHandle()
            Text("Import Model")
                .font(.system(size: 18, weight: .bold))
                .foregroundStyle(Theme.textPrimary)
                .padding(.bottom, 10)

            SheetRow(label: "Files App") { state.sheet = nil }
            SheetRow(label: "iCloud Drive") { state.sheet = nil }
            SheetRow(label: "AirDrop", showDivider: false) { state.sheet = nil }

            Text("Supports OBJ · FBX · IFC · 3DS · STL · glTF/GLB")
                .font(.system(size: 12))
                .foregroundStyle(Theme.textSecondary)
                .padding(.top, 12)

            SecondaryButton(title: "Cancel") { state.sheet = nil }
                .padding(.top, 16)
        }
        .padding(.horizontal, 20)
        .padding(.top, 20)
        .padding(.bottom, 34)
        .background(Theme.card)
        .clipShape(RoundedCorners(radius: 20, corners: [.topLeft, .topRight]))
    }
}
