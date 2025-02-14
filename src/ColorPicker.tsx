import { useRef, useState } from "react";
import { PhotoshopPicker } from "react-color";
import { getTextColor } from "./utils";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: Readonly<ColorPickerProps>) {
  const [showPicker, setShowPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);
  const colorBeforePicking = useRef(color);

  const handleColorChange = (color: { hex: string }) => {
    setCurrentColor(color.hex);
  };

  const handleColorChangeComplete = (color: { hex: string }) => {
    setCurrentColor(color.hex);
  };

  const handleAccept = () => {
    setShowPicker(false);
    onChange(currentColor);
  };

  const handleCancel = () => {
    setShowPicker(false);
    setCurrentColor(colorBeforePicking.current);
  };

  const handleClick = () => {
    setShowPicker(!showPicker);
    if (showPicker) {
      handleCancel();
    }

    if (!showPicker) {
      colorBeforePicking.current = color;
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: currentColor,
          color: getTextColor(currentColor),
        }}
        onClick={handleClick}
      >
        {currentColor}
      </button>
      {showPicker && (
        <PhotoshopPicker
          color={currentColor}
          onChange={handleColorChange}
          onChangeComplete={handleColorChangeComplete}
          onAccept={handleAccept}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
