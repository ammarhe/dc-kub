import Foundation

/// A single 3D model file shown in the library / opened in the viewer.
struct ModelFile: Identifiable, Equatable {
    let id: Int
    let name: String
    let format: String   // OBJ, FBX, IFC, 3DS, STL, GLB …
    let size: String
    let date: String
    let meta: String

    /// "128 MB · Jul 18 · 42 stories · BIM model"
    var metaLine: String { "\(size) · \(date) · \(meta)" }

    static let samples: [ModelFile] = [
        .init(id: 1, name: "Riverside_Tower.ifc",  format: "IFC", size: "128 MB", date: "Jul 18", meta: "42 stories · BIM model"),
        .init(id: 2, name: "Warehouse_Frame.obj",  format: "OBJ", size: "34 MB",  date: "Jul 15", meta: "12,480 faces"),
        .init(id: 3, name: "Facade_Panel.fbx",     format: "FBX", size: "8.2 MB", date: "Jul 12", meta: "Rigged · textures"),
        .init(id: 4, name: "Site_Model.3ds",       format: "3DS", size: "52 MB",  date: "Jul 9",  meta: "3ds Max export"),
        .init(id: 5, name: "HVAC_Duct.stl",        format: "STL", size: "2.1 MB", date: "Jul 6",  meta: "Watertight mesh"),
        .init(id: 6, name: "Lobby_Concept.glb",    format: "GLB", size: "19 MB",  date: "Jul 2",  meta: "PBR materials"),
    ]
}

/// Tools available in the viewer's bottom bar.
enum ViewerTool: String, CaseIterable, Identifiable {
    case orbit, pan, zoom, measure
    var id: String { rawValue }
    var label: String {
        switch self {
        case .orbit:   return "Orbit"
        case .pan:     return "Pan"
        case .zoom:    return "Zoom"
        case .measure: return "Measure"
        }
    }
}

let exportFormats = ["OBJ", "FBX", "GLTF", "STL", "IFC"]
