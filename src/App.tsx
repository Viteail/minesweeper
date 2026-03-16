import "./App.css";

import { Grid, Menu } from "./components";

import { useState } from "react";

type TCoords = {
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

function App() {
  const [switchToGrid, setSwitchToGrid] = useState(false);
  const [gridSize, setGridSize] = useState<TGrid | null>(null);

  const [squares, setSquares] = useState<TSquare[]>([]);
  const [isFirstSquareClicked, setIsFirstSquareClicked] = useState(false);

  const isSamePostion = (firstCoords: TCoords, secondCoords: TCoords) =>
    firstCoords.col === secondCoords.col &&
    firstCoords.row === secondCoords.row;

  const updateSquareNearbyBombs = (squares: TSquare[]) => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].isBomb) continue;
      const nearbySquares = getNearbySquares(squares[i].coords);
      nearbySquares.forEach((nearbySquare) => {
        if (nearbySquare.isBomb) squares[i].nearBombs += 1;
      });
    }
  };

  const plantBombs = (clickedSquare: TSquare) => {
    const bombsAmount = Math.round(squares.length * 0.2);

    const tempSquares = [...squares];
    let randomCoords: TCoords;

    for (let i = 0; i < bombsAmount; i++) {
      do {
        const randomCol = Math.floor(Math.random() * gridSize!.cols);
        const randomRow = Math.floor(Math.random() * gridSize!.rows);

        randomCoords = { col: randomCol, row: randomRow };
      } while (isSamePostion(randomCoords, clickedSquare.coords));

      const randomSquare = tempSquares.find(({ coords }) =>
        isSamePostion(coords, randomCoords),
      );

      randomSquare!.isBomb = true;
    }

    updateSquareNearbyBombs(tempSquares);

    setSquares(tempSquares);
  };

  const isOutOfBounds = (coord: TCoords) => {
    if (
      coord.col < 0 ||
      coord.col >= gridSize!.cols ||
      coord.row < 0 ||
      coord.row >= gridSize!.rows
    )
      return true;
    return false;
  };

  const getNearbySquares = (coords: TCoords) => {
    const nearbySquares: TSquare[] = [];
    const nearbyCoords: TCoords[] = [];

    const upLeft = { col: coords.col - 1, row: coords.row - 1 };
    if (!isOutOfBounds(upLeft)) nearbyCoords.push(upLeft);

    const up = { col: coords.col, row: coords.row - 1 };
    if (!isOutOfBounds(up)) nearbyCoords.push(up);

    const upRight = { col: coords.col + 1, row: coords.row - 1 };
    if (!isOutOfBounds(upRight)) nearbyCoords.push(upRight);

    const left = { col: coords.col - 1, row: coords.row };
    if (!isOutOfBounds(left)) nearbyCoords.push(left);

    const right = { col: coords.col + 1, row: coords.row };
    if (!isOutOfBounds(right)) nearbyCoords.push(right);

    const downLeft = { col: coords.col - 1, row: coords.row + 1 };
    if (!isOutOfBounds(downLeft)) nearbyCoords.push(downLeft);

    const down = { col: coords.col, row: coords.row + 1 };
    if (!isOutOfBounds(down)) nearbyCoords.push(down);

    const downRight = { col: coords.col + 1, row: coords.row + 1 };
    if (!isOutOfBounds(downRight)) nearbyCoords.push(downRight);

    for (let i = 0; i < nearbyCoords.length; i++) {
      const foundSquare = squares.find(({ coords }) =>
        isSamePostion(coords, nearbyCoords[i]),
      );

      if (foundSquare) nearbySquares.push(foundSquare);
    }

    return nearbySquares;
  };

  const revealNearbyBombs = (square: TSquare) => {
    const tempSquares = [...squares];
    const squaresToBeRevealed = [square];

    do {
      const tempSquaresToBeRevealed = [
        ...squaresToBeRevealed.filter(
          (squareToBeRevealed) => !squareToBeRevealed.isClicked,
        ),
      ];
      console.log("coaie", tempSquaresToBeRevealed);
      squaresToBeRevealed.splice(0, squaresToBeRevealed.length);

      for (let i = 0; i < tempSquaresToBeRevealed.length; i++) {
        if (
          !tempSquaresToBeRevealed[i].nearBombs &&
          !tempSquaresToBeRevealed.some((tempSquare) => tempSquare.isBomb)
        ) {
          squaresToBeRevealed.push(
            ...getNearbySquares(tempSquaresToBeRevealed[i].coords),
          );
        }
        const foundSquare = squares.find(({ coords }) =>
          isSamePostion(coords, tempSquaresToBeRevealed[i].coords),
        );
        console.log(foundSquare);
        foundSquare!.isClicked = true;
      }
    } while (squaresToBeRevealed.length);

    setSquares(tempSquares);
  };

  const handleClickMenuButton = (value: TGrid) => {
    setGridSize(value);
    setSwitchToGrid(true);

    const tempSquares = [];

    for (let i = 0; i < value.rows; i++) {
      for (let j = 0; j < value.cols; j++) {
        tempSquares.push({
          isBomb: false,
          nearBombs: 0,
          isClicked: false,
          isFlagged: false,
          coords: { col: j, row: i },
        });
      }
    }

    setSquares(tempSquares);
  };

  const handleClickSquare = (clickedSquare: TSquare) => {
    console.log("click nahoy", clickedSquare);
    if (!isFirstSquareClicked) {
      plantBombs(clickedSquare);
      setIsFirstSquareClicked(true);
    }
    revealNearbyBombs(clickedSquare);
  };

  console.log(gridSize, switchToGrid, squares);

  return (
    <div>
      <Menu handleClick={handleClickMenuButton}></Menu>
      {switchToGrid && (
        <Grid
          handleClickSquare={handleClickSquare}
          gridSize={gridSize as TGrid}
          squares={squares}
        ></Grid>
      )}
    </div>
  );
}

export default App;
