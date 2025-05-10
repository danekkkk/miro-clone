"use client";

import { ReactNode } from "react";
import { RoomProvider } from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react/suspense";

type RoomProps = {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
};

export const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={fallback}>
        {() => <>{children}</>}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
