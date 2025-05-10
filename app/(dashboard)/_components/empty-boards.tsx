"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export const EmptyBoards = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate: createNewBoard, pending } = useApiMutation(api.board.create);

  const handleCreateNewBoard = () => {
    if (!organization) return;

    createNewBoard({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created!");
        router.push(`/board/${id}`);
      })
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/empty-boards.svg"
        alt="Empty"
        width={240}
        height={240}
        className="rotate-[20deg]"
      />
      <h2 className="text-2xl font-semibold mt-12">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button onClick={handleCreateNewBoard} size="lg" disabled={pending}>
          Create board
        </Button>
      </div>
    </div>
  );
};
