import { useRef, useState } from "react";
import { PhotoshopPicker } from "react-color";

import "./App.css";

interface TileColor {
  occuranceWeight: number;
  color: string;
}

const initialColors: Array<TileColor> = [
  {
    occuranceWeight: 60,
    color: "#123456",
  },
  {
    occuranceWeight: 20,
    color: "#789abc",
  },
  {
    occuranceWeight: 10,
    color: "#abc123",
  },
  {
    occuranceWeight: 10,
    color: "#123abc",
  },
];

function App() {
  const [colors, setColors] = useState<Array<TileColor>>(initialColors);
  const [gap, setGap] = useState(6);
  const [tileSize, setTileSize] = useState(50);
  const [numTiles, setNumTiles] = useState(300);
  const [cornerSize, setCornerSize] = useState(5);
  const [backgroundColor, setBackgroundColor] = useState("#000000");

  const totalWeight = colors.reduce(
    (acc, curr) => acc + curr.occuranceWeight,
    0
  );

  return (
    <>
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <label htmlFor="gap">Gap: </label>
        <input
          id="gap"
          type="number"
          value={gap}
          onChange={(e) => setGap(parseInt(e.target.value))}
        />
        <label htmlFor="tileSize">Tile size: </label>
        <input
          id="tileSize"
          type="number"
          value={tileSize}
          onChange={(e) => setTileSize(parseInt(e.target.value))}
        />
        <label htmlFor="cornerSize">Corner size: </label>
        <input
          id="cornerSize"
          type="number"
          value={cornerSize}
          onChange={(e) => setCornerSize(parseInt(e.target.value))}
        />
        <label htmlFor="numTiles">Number of tiles: </label>
        <input
          id="numTiles"
          type="number"
          value={numTiles}
          onChange={(e) => setNumTiles(parseInt(e.target.value))}
        />
        <label htmlFor="backgroundColor">Background color: </label>
        <ColorPicker
          color={backgroundColor}
          onChange={(color) => setBackgroundColor(color)}
        />
      </div>
      <div
        style={{
          marginBottom: "1rem",
          border: "1px solid black",
          padding: "1rem",
        }}
      >
        <h4>Colors: </h4>
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {colors.map((color, i) => (
            <div
              key={`${color.occuranceWeight}-${color.color}`}
              style={{
                display: "flex",
                gap: "1rem",
                border: "1px solid black",
              }}
            >
              <label htmlFor={`occuranceWeight-${i}`}>Weight: </label>
              <input
                type="number"
                value={color.occuranceWeight}
                id={`occuranceWeight-${i}`}
                onChange={(e) => {
                  const newColors = [...colors];
                  newColors[i].occuranceWeight = parseInt(e.target.value);
                  setColors(newColors);
                }}
              />
              <ColorPicker
                color={color.color}
                onChange={(color) => {
                  const newColors = [...colors];
                  newColors[i].color = color;
                  setColors(newColors);
                }}
              />
              <button
                style={{
                  backgroundColor: "rgba(161, 75, 75, 0.6)",
                  color: "white",
                }}
                onClick={() => {
                  const newColors = [...colors];
                  newColors.splice(i, 1);
                  setColors(newColors);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          style={{ backgroundColor: "green", color: "white" }}
          onClick={() => {
            const newColors = [...colors];
            newColors.push({
              occuranceWeight: 0,
              color: getRandomColor(),
            });
            setColors(newColors);
          }}
        >
          Add color
        </button>
        <p>
          Weights Total: {totalWeight}
          {totalWeight !== 100
            ? " (should be 100 to represent a percentage)"
            : ""}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: gap,
          backgroundColor: backgroundColor,
          padding: "30px",
        }}
      >
        {new Array(numTiles).fill(0).map((_, i) => {
          const color = getColor(colors);

          return (
            <div
              key={`tile-${i}-${color}`}
              className="tile"
              style={getTileStyle(tileSize, cornerSize, color)}
            ></div>
          );
        })}
      </div>
    </>
  );
}

function getTileStyle(tileSize: number, borderRadius: number, color: string) {
  const baseStyle = {
    display: "inline-block",
    boxShadow: `
      inset 0 0 10px rgba(255, 255, 255, 0.35),
      inset 0 0 20px rgba(255, 255, 255, 0.15)
    `,
  };

  return {
    ...baseStyle,
    borderRadius: `${borderRadius}px`,
    width: tileSize,
    height: tileSize,
    backgroundColor: color,
  };
}

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

function ColorPicker({ color, onChange }: Readonly<ColorPickerProps>) {
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

export default App;

function getColor(colors: Array<TileColor>) {
  const totalWeight = colors.reduce(
    (acc, curr) => acc + curr.occuranceWeight,
    0
  );
  const random = Math.floor(Math.random() * totalWeight);
  let currentWeight = 0;
  for (const color of colors) {
    currentWeight += color.occuranceWeight;
    if (random < currentWeight) {
      return color.color;
    }
  }
  return colors[0].color;
}

function getTextColor(backgroundColor: string) {
  const r = parseInt(backgroundColor.substring(1, 3), 16);
  const g = parseInt(backgroundColor.substring(3, 5), 16);
  const b = parseInt(backgroundColor.substring(5, 7), 16);

  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  return luminance < 0.5 ? "#FFFFFF" : "#000000";
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
