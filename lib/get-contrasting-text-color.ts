import { Color } from "@/types/canvas";

export const getContrastingTextColor = (color: Color) => {
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

  return luminance > 182 ? "#000" : "#fff";
};
