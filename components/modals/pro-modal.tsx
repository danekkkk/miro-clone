"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useProModal } from "@/store/use-pro-modal";

export const ProModal = () => {
  const { isOpen, onClose } = useProModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade to Pro</DialogTitle>
          <DialogDescription>
            Create unlimited boards and more
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
