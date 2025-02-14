import { TileColor } from "./types";

export function getColor(colors: Array<TileColor>) {
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

export function getTextColor(backgroundColor: string) {
  const r = parseInt(backgroundColor.substring(1, 3), 16);
  const g = parseInt(backgroundColor.substring(3, 5), 16);
  const b = parseInt(backgroundColor.substring(5, 7), 16);

  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  return luminance < 0.5 ? "#FFFFFF" : "#000000";
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getTileStyle(
  tileSize: number,
  borderRadius: number,
  color: string
) {
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

export function getInitialColors(): Array<TileColor> {
  return [
    {
      id: "1",
      occuranceWeight: 60,
      color: "#123456",
    },
    {
      id: "2",
      occuranceWeight: 20,
      color: "#789abc",
    },
    {
      id: "3",
      occuranceWeight: 10,
      color: "#abc123",
    },
    {
      id: "4",
      occuranceWeight: 10,
      color: "#123abc",
    },
  ];
}
