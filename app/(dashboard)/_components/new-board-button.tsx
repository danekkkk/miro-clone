"use client";

import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
type NewBoardButtonProps = {
  orgId: string;
  disabled?: boolean;
};

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate: createNewBoard, pending } = useApiMutation(api.board.create);
  const router = useRouter();

  const handleCreateNewBoard = () => {
    createNewBoard({ orgId, title: "Untitled" })
      .then((id) => {
        toast.success("Board created");
        router.push(`/board/${id}`);
      })
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={handleCreateNewBoard}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col justify-center items-center py-6",
        disabled && "cursor-not-allowed opacity-75 hover:bg-blue-600",
        pending && "cursor-wait opacity-75 hover:bg-blue-600"
      )}
    >
      <Plus className="size-10 text-white stroke-1" />
      <p className="text-xs text-white font-light">New Board</p>
    </button>
  );
};
