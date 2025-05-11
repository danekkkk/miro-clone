import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { cn } from "@/lib/utils";
import { typeColorToCss } from "@/lib/type-color-to-css";
import { NoteLayer } from "@/types/canvas";
import { calculateFontSize } from "@/lib/calculate-font-size";
import { useMutation } from "@liveblocks/react/suspense";
import { getContrastingTextColor } from "@/lib/get-contrasting-text-color";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

type NoteProps = {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

export const Note = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: NoteProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => {
        if (e.target instanceof HTMLElement) {
          e.stopPropagation();
          return;
        }
        onPointerDown(e, id);
      }}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: fill ? typeColorToCss(fill) : "#CCC",
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        html={value || "Text"}
        onChange={handleContentChange}
        className={cn(
          "flex items-center justify-center text-center outline-none p-1",
          font.className
        )}
        style={{
          fontSize: calculateFontSize(width, height, 0.15),
          color: fill ? getContrastingTextColor(fill) : "#CCC",
        }}
        disabled={false}
        spellCheck={false}
      />
    </foreignObject>
  );
};
