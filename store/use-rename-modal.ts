import { create } from "zustand";

const defaultValues = { id: "", title: "" };

type TRenameModal = {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (
    id: (typeof defaultValues)["id"],
    title: (typeof defaultValues)["title"]
  ) => void;
  onClose: () => void;
};

export const useRenameModal = create<TRenameModal>((set) => ({
  isOpen: false,
  initialValues: defaultValues,
  onOpen: (id, title) => set({ isOpen: true, initialValues: { id, title } }),
  onClose: () => set({ isOpen: false, initialValues: defaultValues }),
}));
