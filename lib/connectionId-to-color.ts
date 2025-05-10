import { COLORS } from "@/constants/user-border-colors";

export const connectionIdToColor = (connectionId: number): string => {
  return COLORS[connectionId % COLORS.length];
};
