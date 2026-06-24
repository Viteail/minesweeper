import { useEffect, useState } from "react";

import type { TGrid, TSquare } from "../types/minesweeper";
import { isOutOfBounds, isSamePostion } from "../utils/minesweeper";

export const useMinesweeper = () => {
  const [switchToGrid, setSwitchToGrid] = useState(false);
  const [gridSize, setGridSize] = useState<TGrid | null>(null);
  const [squares, setSquares] = useState<TSquare[]>([]);
  const [isFirstSquareClicked, setIsFirstSquareClicked] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [revealBombs, setRevealBombs] = useState(false);
  const [time, setTime] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    if (isWon || isLost || !switchToGrid) return;

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isWon, isLost, switchToGrid]);

  const resetBoard = () => {
    setSquares([]);
    setIsFirstSquareClicked(false);
    setIsWon(false);
    setIsLost(false);
    setRevealBombs(false);
  };

  const updateSquareNearbyBombs = (squares: TSquare[]) => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].isBomb) continue;
      const nearbySquares = getNearbySquares(squares[i].coords);
      nearbySquares.forEach((nearbySquare) => {
        if (nearbySquare.isBomb) squares[i].nearBombs += 1;
      });
    }
  };

  const isWinCondition = () => {
    const nonBombSquares = squares.filter((square) => !square.isBomb);
    const isEverySquareRevealed = nonBombSquares.every(
      (square) => square.isClicked,
    );

    if (isEverySquareRevealed) return true;
    return false;
  };

  const isLoseCondition = () => {
    const bombSquares = squares.filter((square) => square.isBomb);
    const isAnyBombClicked = bombSquares.some((square) => square.isClicked);

    if (isAnyBombClicked) return true;
    return false;
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

  const getNearbySquares = (coords: TCoords) => {
    const nearbySquares: TSquare[] = [];
    const nearbyCoords: TCoords[] = [];

    const upLeft = { col: coords.col - 1, row: coords.row - 1 };
    if (!isOutOfBounds(upLeft, gridSize!)) nearbyCoords.push(upLeft);

    const up = { col: coords.col, row: coords.row - 1 };
    if (!isOutOfBounds(up, gridSize!)) nearbyCoords.push(up);

    const upRight = { col: coords.col + 1, row: coords.row - 1 };
    if (!isOutOfBounds(upRight, gridSize!)) nearbyCoords.push(upRight);

    const left = { col: coords.col - 1, row: coords.row };
    if (!isOutOfBounds(left, gridSize!)) nearbyCoords.push(left);

    const right = { col: coords.col + 1, row: coords.row };
    if (!isOutOfBounds(right, gridSize!)) nearbyCoords.push(right);

    const downLeft = { col: coords.col - 1, row: coords.row + 1 };
    if (!isOutOfBounds(downLeft, gridSize!)) nearbyCoords.push(downLeft);

    const down = { col: coords.col, row: coords.row + 1 };
    if (!isOutOfBounds(down, gridSize!)) nearbyCoords.push(down);

    const downRight = { col: coords.col + 1, row: coords.row + 1 };
    if (!isOutOfBounds(downRight, gridSize!)) nearbyCoords.push(downRight);

    for (let i = 0; i < nearbyCoords.length; i++) {
      const foundSquare = squares.find(({ coords }) =>
        isSamePostion(coords, nearbyCoords[i]),
      );

      if (foundSquare) nearbySquares.push(foundSquare);
    }

    return nearbySquares;
  };

  const isFlagMatchBomb = (clickedSquare: TSquare) => {
    const nearbySquares = getNearbySquares(clickedSquare.coords);

    let nearbyFlags = 0;
    nearbySquares.forEach((square) => square.isFlagged && nearbyFlags++);

    if (nearbyFlags === clickedSquare.nearBombs) return true;
    return false;
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
        const foundSquare = tempSquares.find(({ coords }) =>
          isSamePostion(coords, tempSquaresToBeRevealed[i].coords),
        );
        foundSquare!.isClicked = true;
        foundSquare!.isFlagged = false;
      }
    } while (squaresToBeRevealed.length);

    setSquares(tempSquares);
  };

  const revealUnflaggedSquares = (clickedSquare: TSquare) => {
    const tempSquares = [...squares];

    const nearbyUnflaggedSquares = getNearbySquares(
      clickedSquare.coords,
    ).filter((square) => !square.isFlagged);

    nearbyUnflaggedSquares.forEach((unflaggedSquare) => {
      const foundSquare = tempSquares.find(({ coords }) =>
        isSamePostion(coords, unflaggedSquare.coords),
      );
      if (foundSquare) revealNearbyBombs(foundSquare);
    });

    setSquares(tempSquares);
  };

  const startGame = (value: TGrid) => {
    if (gridSize !== value) {
      setGridSize(value);
      setSwitchToGrid(true);
    }

    if (squares.length) resetBoard();

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

  const handleRightClickSquare = (
    event: React.MouseEvent<HTMLDivElement>,
    clickedSquare: TSquare,
  ) => {
    event.preventDefault();

    if (clickedSquare.isClicked || isWon || isLost) return;

    const tempSquares = [...squares];
    const foundSquare = tempSquares.find(({ coords }) =>
      isSamePostion(coords, clickedSquare.coords),
    );

    if (!foundSquare!.isFlagged) foundSquare!.isFlagged = true;
    else foundSquare!.isFlagged = false;

    setSquares(tempSquares);
  };

  const handleClickSquare = (clickedSquare: TSquare) => {
    if (!isFirstSquareClicked) {
      plantBombs(clickedSquare);
      setIsFirstSquareClicked(true);
    }
    if (clickedSquare.isFlagged || isWon || isLost) return;

    if (isFlagMatchBomb(clickedSquare) && clickedSquare.isClicked)
      revealUnflaggedSquares(clickedSquare);

    if (!clickedSquare.isClicked) revealNearbyBombs(clickedSquare);

    if (isWinCondition()) {
      setIsWon(true);
      updateScore();
    }
    if (isLoseCondition()) {
      setIsLost(true);
      setRevealBombs(true);
      resetTimer();
    }
  };

  const resetTimer = () => {
    setTime(0);
  };

  const updateScore = () => {
    if (time < bestScore || bestScore === 0) setBestScore(time);
    resetTimer();
  };

  const handleReturnMenu = () => {
    setGridSize(null);
    setSwitchToGrid(false);
    resetBoard();
    resetTimer();
  };

  return {
    gridSize,
    switchToGrid,
    squares,
    revealBombs,
    isWon,
    isLost,
    time,
    bestScore,
    startGame,
    handleClickSquare,
    handleRightClickSquare,
    handleReturnMenu,
  };
};
