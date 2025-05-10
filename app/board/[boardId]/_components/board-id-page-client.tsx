"use client";

import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { Room } from "@/components/room";
import { Canvas } from "./canvas";
import { Loading } from "./loading";

type BoardIdPageClientProps = {
  boardId: string;
};

export const BoardIdPageClient = ({ boardId }: BoardIdPageClientProps) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <Room roomId={boardId} fallback={<Loading />}>
        <Canvas boardId={boardId} />
      </Room>
    </LiveblocksProvider>
  );
};
