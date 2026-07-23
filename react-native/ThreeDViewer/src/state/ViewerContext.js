import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { FILES } from '../data';

const ViewerContext = createContext(null);

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const DEFAULT_VIEW = { rotX: -18, rotY: 35, zoom: 1, panX: 0, panY: 0 };

// Central app state — mirrors the `state` object + handlers in the design source.
export function ViewerProvider({ children }) {
  const [screen, setScreen] = useState('library'); // 'library' | 'viewer'
  const [selectedId, setSelectedId] = useState(1);
  const [sheet, setSheet] = useState(null); // 'import' | 'info' | 'share' | null
  const [activeTool, setActiveTool] = useState('orbit');
  const [view, setView] = useState(DEFAULT_VIEW);
  const [measurePoints, setMeasurePoints] = useState([]);
  const [exportFormat, setExportFormat] = useState('OBJ');

  const selected = useMemo(
    () => FILES.find((f) => f.id === selectedId) || FILES[0],
    [selectedId]
  );

  const openFile = useCallback((id) => {
    setSelectedId(id);
    setActiveTool('orbit');
    setView(DEFAULT_VIEW);
    setMeasurePoints([]);
    setScreen('viewer');
  }, []);

  const backToLibrary = useCallback(() => setScreen('library'), []);

  const setTool = useCallback((key) => {
    setActiveTool(key);
    setMeasurePoints([]);
  }, []);

  const resetView = useCallback(() => setView(DEFAULT_VIEW), []);
  const clearMeasure = useCallback(() => setMeasurePoints([]), []);

  const addMeasurePoint = useCallback((p) => {
    setMeasurePoints((pts) => (pts.length >= 2 ? [p] : [...pts, p]));
  }, []);

  // Drag deltas from the gesture recognizer.
  const orbit = useCallback((dx, dy) => {
    setView((v) => ({ ...v, rotY: v.rotY + dx * 0.5, rotX: clamp(v.rotX - dy * 0.5, -80, 80) }));
  }, []);
  const pan = useCallback((dx, dy) => {
    setView((v) => ({ ...v, panX: v.panX + dx, panY: v.panY + dy }));
  }, []);
  const pinchZoom = useCallback((dy) => {
    setView((v) => ({ ...v, zoom: clamp(v.zoom - dy * 0.006, 0.5, 2.5) }));
  }, []);

  const hasTwoPoints = measurePoints.length === 2;
  const measureLabel = useMemo(() => {
    if (!hasTwoPoints) return '';
    const [a, b] = measurePoints;
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    return `${(dist / 110).toFixed(2)} m`;
  }, [hasTwoPoints, measurePoints]);

  const value = {
    screen, selected, selectedId, sheet, setSheet,
    activeTool, view, measurePoints, exportFormat, setExportFormat,
    hasTwoPoints, measureLabel,
    openFile, backToLibrary, setTool, resetView, clearMeasure, addMeasurePoint,
    orbit, pan, pinchZoom,
  };

  return <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>;
}

export const useViewer = () => {
  const ctx = useContext(ViewerContext);
  if (!ctx) throw new Error('useViewer must be used within a ViewerProvider');
  return ctx;
};
