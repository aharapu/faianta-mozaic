import { useState } from "react";
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
  const [gap, setGap] = useState(8);
  const [tileSize, setTileSize] = useState(50);
  const [numTiles, setNumTiles] = useState(300);
  const [backgroundColor, setBackgroundColor] = useState("#000000");

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
        <label htmlFor="numTiles">Number of tiles: </label>
        <input
          id="numTiles"
          type="number"
          value={numTiles}
          onChange={(e) => setNumTiles(parseInt(e.target.value))}
        />
        <label htmlFor="backgroundColor">Background color: </label>
        <input
          id="backgroundColor"
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tileSize">Colors: </label>
        {colors.map((color, i) => (
          <div key={i}>
            <input
              type="number"
              value={color.occuranceWeight}
              onChange={(e) => {
                const newColors = [...colors];
                newColors[i].occuranceWeight = parseInt(e.target.value);
                setColors(newColors);
              }}
            />
            <input
              type="color"
              value={color.color}
              onChange={(e) => {
                const newColors = [...colors];
                newColors[i].color = e.target.value;
                setColors(newColors);
              }}
            />
          </div>
        ))}
        <p>
          Total: {colors.reduce((acc, curr) => acc + curr.occuranceWeight, 0)}
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
        {new Array(numTiles).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              width: tileSize,
              height: tileSize,
              backgroundColor: getColor(colors),
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

// interface ColorPickerProps {
//   color: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// function ColorPicker({ color, onChange }: Readonly<ColorPickerProps>) {
//   return (
//     <div>
//       <input type="color" value={color} onChange={onChange} />
//     </div>
//   );
// }

export default App;

function getColor(colors: Array<TileColor>) {
  const totalWeight = colors.reduce(
    (acc, curr) => acc + curr.occuranceWeight,
    0
  );
  const random = Math.floor(Math.random() * totalWeight);
  let currentWeight = 0;
  for (let i = 0; i < colors.length; i++) {
    currentWeight += colors[i].occuranceWeight;
    if (random < currentWeight) {
      return colors[i].color;
    }
  }
  return colors[0].color;
}
