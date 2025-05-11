"use client";

import { typeColorToCss } from "@/lib/type-color-to-css";
import { Color } from "@/types/canvas";
import { memo } from "react";

type ColorPickerProps = {
  onChange: (color: Color) => void;
};

export const ColorPicker = memo(({ onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      <ColorButton onClick={onChange} color={{ r: 243, g: 82, b: 35 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 255, b: 100 }} />
      <ColorButton onClick={onChange} color={{ r: 68, g: 202, b: 99 }} />
      <ColorButton onClick={onChange} color={{ r: 39, g: 142, b: 237 }} />
      <ColorButton onClick={onChange} color={{ r: 155, g: 105, b: 245 }} />
      <ColorButton onClick={onChange} color={{ r: 252, g: 142, b: 42 }} />
      <ColorButton onClick={onChange} color={{ r: 0, g: 0, b: 0 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 255, b: 255 }} />
    </div>
  );
});

ColorPicker.displayName = "ColorPicker";

type ColorButtonProps = {
  onClick: (color: Color) => void;
  color: Color;
};

const ColorButton = memo(({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className="size-8 flex items-center justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="size-8 rounded-full border border-neutral-300"
        style={{
          backgroundColor: typeColorToCss(color),
        }}
      ></div>
    </button>
  );
});
