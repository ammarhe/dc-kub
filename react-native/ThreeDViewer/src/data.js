// Sample model library + viewer tool / export-format definitions,
// mirroring the `files`, tool list, and export formats in the design source.

export const FILES = [
  { id: 1, name: 'Riverside_Tower.ifc', format: 'IFC', size: '128 MB', date: 'Jul 18', meta: '42 stories · BIM model' },
  { id: 2, name: 'Warehouse_Frame.obj', format: 'OBJ', size: '34 MB', date: 'Jul 15', meta: '12,480 faces' },
  { id: 3, name: 'Facade_Panel.fbx', format: 'FBX', size: '8.2 MB', date: 'Jul 12', meta: 'Rigged · textures' },
  { id: 4, name: 'Site_Model.3ds', format: '3DS', size: '52 MB', date: 'Jul 9', meta: '3ds Max export' },
  { id: 5, name: 'HVAC_Duct.stl', format: 'STL', size: '2.1 MB', date: 'Jul 6', meta: 'Watertight mesh' },
  { id: 6, name: 'Lobby_Concept.glb', format: 'GLB', size: '19 MB', date: 'Jul 2', meta: 'PBR materials' },
];

export const metaLine = (f) => `${f.size} · ${f.date} · ${f.meta}`;

export const TOOLS = [
  { key: 'orbit', label: 'Orbit' },
  { key: 'pan', label: 'Pan' },
  { key: 'zoom', label: 'Zoom' },
  { key: 'measure', label: 'Measure' },
];

export const EXPORT_FORMATS = ['OBJ', 'FBX', 'GLTF', 'STL', 'IFC'];
