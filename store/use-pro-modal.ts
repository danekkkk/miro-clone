import { create } from "zustand";

type TProModal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useProModal = create<TProModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
