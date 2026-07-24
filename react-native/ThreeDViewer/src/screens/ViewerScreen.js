import React, { useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, PanResponder } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '../theme';
import { TOOLS } from '../data';
import { Pill } from '../components/UI';
import DotGrid from '../viewer/DotGrid';
import Model3D from '../viewer/Model3D';
import MeasureOverlay from '../viewer/MeasureOverlay';
import { useViewer } from '../state/ViewerContext';

export default function ViewerScreen() {
  const v = useViewer();
  const insets = useSafeAreaInsets();
  const [canvas, setCanvas] = useState({ width: 0, height: 0 });

  // Track last cumulative drag so we can feed per-frame deltas to orbit/pan/zoom.
  const last = useRef({ x: 0, y: 0 });
  const toolRef = useRef(v.activeTool);
  toolRef.current = v.activeTool;

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        last.current = { x: 0, y: 0 };
        // Remember where a measure tap started (relative to the canvas view).
        last.current.tapX = evt.nativeEvent.locationX;
        last.current.tapY = evt.nativeEvent.locationY;
        last.current.moved = false;
      },
      onPanResponderMove: (evt, g) => {
        if (Math.abs(g.dx) > 3 || Math.abs(g.dy) > 3) last.current.moved = true;
        if (toolRef.current === 'measure') return;
        const dx = g.dx - last.current.x;
        const dy = g.dy - last.current.y;
        last.current.x = g.dx;
        last.current.y = g.dy;
        if (toolRef.current === 'orbit') v.orbit(dx, dy);
        else if (toolRef.current === 'pan') v.pan(dx, dy);
        else if (toolRef.current === 'zoom') v.pinchZoom(dy);
      },
      onPanResponderRelease: () => {
        if (toolRef.current === 'measure' && !last.current.moved) {
          v.addMeasurePoint({ x: last.current.tapX, y: last.current.tapY });
        }
      },
    })
  ).current;

  const onCanvasLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    setCanvas({ width, height });
  };

  return (
    <View style={styles.root}>
      {/* Top bar */}
      <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 12) + 8 }]}>
        <Pressable style={styles.backBtn} onPress={v.backToLibrary}>
          <Text style={styles.backChevron}>‹</Text>
        </Pressable>
        <Text style={styles.topTitle} numberOfLines={1}>{v.selected.name}</Text>
        <Pressable style={styles.headerChip} onPress={() => v.setSheet('info')}>
          <Text style={styles.headerChipText}>Info</Text>
        </Pressable>
        <Pressable style={styles.headerChip} onPress={() => v.setSheet('share')}>
          <Text style={styles.headerChipText}>Share</Text>
        </Pressable>
      </View>

      {/* 3D canvas */}
      <View style={styles.canvas} onLayout={onCanvasLayout} {...responder.panHandlers}>
        {canvas.width > 0 && (
          <>
            <DotGrid width={canvas.width} height={canvas.height} />
            <Model3D
              width={canvas.width}
              height={canvas.height}
              rotX={v.view.rotX}
              rotY={v.view.rotY}
              zoom={v.view.zoom}
              panX={v.view.panX}
              panY={v.view.panY}
            />
            <MeasureOverlay width={canvas.width} height={canvas.height} />
          </>
        )}

        {v.activeTool === 'measure' && !v.hasTwoPoints && (
          <View style={[styles.hint, styles.hintLeft]}>
            <Text style={styles.hintText}>Tap two points to measure</Text>
          </View>
        )}
        {v.hasTwoPoints && (
          <Pressable style={[styles.hint, styles.hintRight]} onPress={v.clearMeasure}>
            <Text style={styles.hintText}>Clear</Text>
          </Pressable>
        )}
      </View>

      {/* Bottom bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 6) }]}>
        <View style={styles.tools}>
          {TOOLS.map((t) => (
            <Pill key={t.key} label={t.label} active={t.key === v.activeTool} fillWidth onPress={() => v.setTool(t.key)} />
          ))}
        </View>
        <Pressable onPress={v.resetView}>
          <Text style={styles.resetText}>Reset View</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Theme.viewerBG },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingBottom: 10,
    backgroundColor: Theme.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.border,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backChevron: { fontSize: 26, color: Theme.textPrimary },
  topTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '600', color: Theme.textPrimary },
  headerChip: { paddingVertical: 7, paddingHorizontal: 12, backgroundColor: Theme.pillBG, borderRadius: 8 },
  headerChipText: { fontSize: 13, fontWeight: '600', color: Theme.textPrimary },

  canvas: { flex: 1, overflow: 'hidden' },
  hint: {
    position: 'absolute',
    top: 12,
    backgroundColor: Theme.card,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  hintLeft: { left: 12 },
  hintRight: { right: 12 },
  hintText: { fontSize: 12, fontWeight: '600', color: Theme.textSecondary },

  bottomBar: {
    backgroundColor: Theme.card,
    borderTopWidth: 1,
    borderTopColor: Theme.border,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  tools: { flexDirection: 'row', gap: 8 },
  resetText: { textAlign: 'center', marginTop: 8, fontSize: 12, fontWeight: '600', color: Theme.accent },
});
