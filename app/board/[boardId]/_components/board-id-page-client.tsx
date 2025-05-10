"use client";

import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { Room } from "@/components/room";
import { Canvas } from "./canvas";
import { publicApiKey } from "@/liveblocks.config";
import { Loading } from "./loading";

type BoardIdPageClientProps = {
  boardId: string;
};

export const BoardIdPageClient = ({ boardId }: BoardIdPageClientProps) => {
  return (
    <LiveblocksProvider publicApiKey={publicApiKey}>
      <Room roomId={boardId} fallback={<Loading />}>
        <Canvas boardId={boardId} />
      </Room>
    </LiveblocksProvider>
  );
};
