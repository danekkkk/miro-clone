import { MAX_FONT_SIZE, SCALE_FACTOR } from "@/constants/font-properties";

export const calculateFontSize = (
  width: number,
  height: number,
  scaleFactor: number = SCALE_FACTOR
) => {
  const fontBasedOnHeight = height * scaleFactor;
  const fontBasedOnWidth = width * scaleFactor;

  return Math.min(fontBasedOnHeight, fontBasedOnWidth, MAX_FONT_SIZE);
};
