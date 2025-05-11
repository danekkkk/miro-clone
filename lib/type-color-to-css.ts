import { Color } from "@/types/canvas";

export const typeColorToCss = (color: Color) => {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
};
