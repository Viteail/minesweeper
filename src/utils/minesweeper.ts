import type { TCoords, TGrid } from "../types/minesweeper";

export const isSamePostion = (firstCoords: TCoords, secondCoords: TCoords) =>
  firstCoords.col === secondCoords.col && firstCoords.row === secondCoords.row;

export const isOutOfBounds = (coord: TCoords, gridSize: TGrid) => {
  if (
    coord.col < 0 ||
    coord.col >= gridSize!.cols ||
    coord.row < 0 ||
    coord.row >= gridSize!.rows
  )
    return true;
  return false;
};
