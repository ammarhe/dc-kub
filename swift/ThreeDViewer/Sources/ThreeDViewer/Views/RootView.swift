import SwiftUI

struct RootView: View {
    @StateObject private var state = ViewerState()

    var body: some View {
        ZStack {
            Group {
                switch state.screen {
                case .library: LibraryView()
                case .viewer:  ViewerView()
                }
            }
            .environmentObject(state)

            // In-canvas bottom sheets (dimmed backdrop + slide up).
            BottomSheetContainer(isPresented: state.sheet != nil,
                                 onDismiss: { state.sheet = nil }) {
                sheetContent
                    .environmentObject(state)
            }
        }
        .ignoresSafeArea()
    }

    @ViewBuilder private var sheetContent: some View {
        switch state.sheet {
        case .importModel: ImportSheet()
        case .info:        InfoSheet()
        case .share:       ShareSheet()
        case .none:        EmptyView()
        }
    }
}

#Preview {
    RootView()
}
