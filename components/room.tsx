"use client";

import { ReactNode } from "react";
import { RoomProvider } from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/node";
import { Layer } from "@/types/canvas";

type RoomProps = {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
};

export const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        penColor: null,
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList<string>([]),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => <>{children}</>}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
