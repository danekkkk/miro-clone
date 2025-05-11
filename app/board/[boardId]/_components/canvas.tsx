"use client";

import { useCallback, useMemo, useState } from "react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
} from "@/types/canvas";
import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
  useStorage,
  useOthersMapped,
} from "@liveblocks/react/suspense";
import { CursorsPresence } from "./cursors-presence";
import { pointerEventToCanvasPoint } from "@/lib/pointer-event-to-canvas-point";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/node";
import { LayerPreview } from "./layer-preview";
import { connectionIdToColor } from "@/lib/connectionId-to-color";

type CanvasProps = {
  boardId: string;
};

const MAX_LAYERS = 100;

export const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
  });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");

      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayersIds = storage.get("layerIds");
      const layerId = nanoid();

      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
      });

      liveLayersIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({
        mode: CanvasMode.None,
      });
    },
    [lastUsedColor]
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);

      setMyPresence({
        cursor: current,
      });
    },
    []
  );

  const onPointerLeave = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      setMyPresence({ cursor: null });
    },
    []
  );

  const onPointerUp = useMutation(
    ({}, e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }

      history.resume();
    },
    [camera, canvasState.mode, history, insertLayer]
  );

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      e.preventDefault();

      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }

      setCanvasState({
        mode: CanvasMode.Translating,
        current: point,
      });
    },
    [canvasState, camera, history, setCanvasState]
  );

  const selections = useOthersMapped((other) => other.presence.selection);
  const layerIdsToColorSeletion = useMemo(() => {
    const layerIdsToColorSeletion: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSeletion[layerId] = connectionIdToColor(connectionId);
      }
    }

    return layerIdsToColorSeletion;
  }, [selections]);

  return (
    <main className="size-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={() => {
          history.undo();
        }}
        redo={() => {
          history.redo();
        }}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <svg
        className="size-full"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translateX(${camera.x}px) translateY(${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSeletion[layerId]}
            />
          ))}
        </g>
      </svg>
      <CursorsPresence />
    </main>
  );
};
