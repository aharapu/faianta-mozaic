export interface TileColor {
  id: string;
  occuranceWeight: number;
  color: string;
}

export interface SavedConfiguration {
  name: string;
  gap: number;
  tileSize: number;
  numTiles: number;
  cornerSize: number;
  backgroundColor: string;
  colors: Array<TileColor>;
}
