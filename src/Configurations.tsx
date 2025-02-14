import React, { useEffect } from "react";
import { SavedConfiguration } from "./types";

interface ConfigurationsProps {
  configName: string;
  setConfigName: React.Dispatch<React.SetStateAction<string>>;
  gap: number;
  setGap: React.Dispatch<React.SetStateAction<number>>;
  tileSize: number;
  setTileSize: React.Dispatch<React.SetStateAction<number>>;
  numTiles: number;
  setNumTiles: React.Dispatch<React.SetStateAction<number>>;
  cornerSize: number;
  setCornerSize: React.Dispatch<React.SetStateAction<number>>;
  backgroundColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  colors: Array<{ occuranceWeight: number; color: string }>;
  setColors: React.Dispatch<
    React.SetStateAction<Array<{ occuranceWeight: number; color: string }>>
  >;
  configurations: Array<SavedConfiguration>;
  setConfigurations: React.Dispatch<
    React.SetStateAction<Array<SavedConfiguration>>
  >;
}

export default function Configurations({
  configName,
  setConfigName,
  gap,
  setGap,
  tileSize,
  setTileSize,
  numTiles,
  setNumTiles,
  cornerSize,
  setCornerSize,
  backgroundColor,
  setBackgroundColor,
  colors,
  setColors,
  configurations,
  setConfigurations,
}: Readonly<ConfigurationsProps>) {
  useEffect(() => {
    const savedConfigurations = localStorage.getItem("configurations");
    if (savedConfigurations) {
      setConfigurations(JSON.parse(savedConfigurations));
    }
  }, []);

  const handleSaveConfig = () => {
    const newConfig = {
      name: configName,
      gap,
      tileSize,
      numTiles,
      cornerSize,
      backgroundColor,
      colors,
    };
    setConfigurations((prev) => [...(prev || []), newConfig]);

    // add to local storage
    localStorage.setItem(
      "configurations",
      JSON.stringify([...(configurations || []), newConfig])
    );
  };

  return (
    <div>
      <label htmlFor="configName">Config name: </label>
      <input
        id="configName"
        type="text"
        value={configName}
        onChange={(e) => setConfigName(e.target.value)}
      />
      <button
        style={{ backgroundColor: "green", color: "white" }}
        onClick={handleSaveConfig}
      >
        Save config
      </button>
      <div
        style={{ marginTop: "1rem", display: "flex", flexDirection: "column" }}
      >
        {configurations.map((config, i) => (
          <div
            key={config.name}
            style={{
              marginBottom: "1rem",
              border: "1px solid black",
              padding: "1rem",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <h4>{config.name}</h4>
            <button
              style={{ backgroundColor: "green", color: "white", padding: 5 }}
              onClick={() => {
                setGap(config.gap);
                setTileSize(config.tileSize);
                setNumTiles(config.numTiles);
                setCornerSize(config.cornerSize);
                setBackgroundColor(config.backgroundColor);
                setColors(config.colors);
              }}
            >
              Load config
            </button>
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                padding: 5,
              }}
              onClick={() => {
                const newConfigurations = [...configurations];
                newConfigurations.splice(i, 1);
                setConfigurations(newConfigurations);
              }}
            >
              Remove config
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
