import { Skeleton } from "@/components/ui/skeleton";

export const Toolbar = () => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <div>Pencil</div>
        <div>Square</div>
        <div>Circle</div>
        <div>Elipsis</div>
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <div>Undo</div>
        <div>Redo</div>
      </div>
    </div>
  );
};

Toolbar.Skeleton = function ToolbarSkeleton() {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-2 flex flex-col gap-y-4 h-[360px] w-[52px]">
      <Skeleton className="size-full bg-neutral-200 shadow-md basis-2/3" />
      <Skeleton className="size-full bg-neutral-200 shadow-md basis-1/3" />
    </div>
  );
};
