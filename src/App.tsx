import { useState } from "react";

import "./App.css";
import { ColorPicker } from "./ColorPicker";
import {
  getColor,
  getInitialColors,
  getRandomColor,
  getTileStyle,
} from "./utils";
import { SavedConfiguration, TileColor } from "./types";
import Configurations from "./Configurations";

function App() {
  const [colors, setColors] = useState<Array<TileColor>>(getInitialColors());
  const [gap, setGap] = useState(6);
  const [tileSize, setTileSize] = useState(50);
  const [numTiles, setNumTiles] = useState(300);
  const [cornerSize, setCornerSize] = useState(5);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [configName, setConfigName] = useState("");
  const [configurations, setConfigurations] = useState<
    Array<SavedConfiguration>
  >([]);

  const totalWeight = colors.reduce(
    (acc, curr) => acc + curr.occuranceWeight,
    0
  );

  return (
    <>
      <Configurations
        configName={configName}
        setConfigName={setConfigName}
        gap={gap}
        setGap={setGap}
        tileSize={tileSize}
        setTileSize={setTileSize}
        numTiles={numTiles}
        setNumTiles={setNumTiles}
        cornerSize={cornerSize}
        setCornerSize={setCornerSize}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        colors={colors}
        setColors={setColors}
        configurations={configurations}
        setConfigurations={setConfigurations}
      />
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
              key={color.id}
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
              id: Date.now().toString(),
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

export default App;
