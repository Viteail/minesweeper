export type TCoords = {
  col: number;
  row: number;
};

export type TSquare = {
  isBomb: boolean;
  nearBombs: number;
  isClicked: boolean;
  isFlagged: boolean;
  coords: TCoords;
};

export type TGrid = {
  cols: number;
  rows: number;
};
