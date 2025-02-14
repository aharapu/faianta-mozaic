import React, { useEffect, useState } from "react";
import { SavedConfiguration, TileColor } from "./types";

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
  colors: Array<TileColor>;
  setColors: React.Dispatch<React.SetStateAction<Array<TileColor>>>;
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
  const [err, setErr] = useState("");

  useEffect(() => {
    const savedConfigurations = localStorage.getItem("configurations");
    if (savedConfigurations) {
      setConfigurations(JSON.parse(savedConfigurations));
    }
  }, []);

  const handleSaveConfig = () => {
    if (!configName) {
      setErr("Config name is required");
      return;
    }

    const existingConfig = configurations.find((c) => c.name === configName);
    if (existingConfig) {
      setErr("Config with same name already exists");
      return;
    }

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

    localStorage.setItem(
      "configurations",
      JSON.stringify([...(configurations || []), newConfig])
    );
  };

  const handleRemoveConfig = (name: string) => {
    const newConfigurations = configurations.filter((c) => c.name !== name);
    setConfigurations(newConfigurations);
    localStorage.setItem("configurations", JSON.stringify(newConfigurations));
  };

  const handleConfigNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfigName(e.target.value);
    setErr("");
  };

  return (
    <div>
      <div
        style={{ marginTop: "1rem", display: "flex", flexDirection: "column" }}
      >
        {configurations.map((config) => (
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
              onClick={() => handleRemoveConfig(config.name)}
            >
              Remove config
            </button>
          </div>
        ))}
      </div>
      <label htmlFor="configName">Config name: </label>
      <input
        id="configName"
        type="text"
        value={configName}
        onChange={handleConfigNameChange}
      />
      <button
        style={{ backgroundColor: "green", color: "white" }}
        onClick={handleSaveConfig}
      >
        Save config
      </button>
      {err && <p style={{ color: "red", fontWeight: "bold" }}>{err}</p>}
    </div>
  );
}
