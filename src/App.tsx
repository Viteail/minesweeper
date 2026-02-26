import "./App.css";

import { Grid, Menu } from "./components";

import { useState } from "react";

type Square = {
  index: number;
  isBomb: boolean;
  nearBombs: number | undefined;
  isClicked: boolean;
};

function App() {
  const [switchToGrid, setSwitchToGrid] = useState(false);
  const [sizeGrid, setSizeGrid] = useState<number | null>(null);

  const [squares, setSquares] = useState<Square[]>([]);
  const [isFirstSquareClicked, setIsFirstSquareClicked] = useState(false);

  const plantBombs = () => {
    const bombsAmount = Math.round(squares.length * 0.15);

    const tempSquares = [...squares];

    for (let i = 0; i < bombsAmount; i++) {
      const randomNumber = Math.floor(Math.random() * squares.length);
      tempSquares[randomNumber].isBomb = true;
    }

    console.log("e", tempSquares);
    setSquares(tempSquares);
  };

  const handleClickMenuButton = (value: number) => {
    setSizeGrid(value);
    setSwitchToGrid(true);

    const squaresAmount = value * value;

    const tempSquares = Array.from({ length: squaresAmount }, (_, index) => ({
      index: index,
      isBomb: false,
      nearBombs: 0,
      isClicked: false,
    }));

    console.log(tempSquares, sizeGrid);

    setSquares(tempSquares);
  };

  const handleClickSquare = () => {
    console.log("click nahoy");
    if (!isFirstSquareClicked) {
      plantBombs();
      setIsFirstSquareClicked(true);
    }
  };

  console.log(sizeGrid, switchToGrid, squares);

  return (
    <div>
      <Menu handleClick={handleClickMenuButton}></Menu>
      {switchToGrid && (
        <Grid
          handleClickSquare={handleClickSquare}
          size={sizeGrid as number}
        ></Grid>
      )}
    </div>
  );
}

export default App;
