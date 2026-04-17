import { Square } from "../Square";
import classes from "./grid.module.css";

import type { TGrid, TSquare } from "../../App";

interface IGridProps {
  gridSize: TGrid;
  handleClickSquare: (arg0: TSquare) => void;
  handleRightClickSquare: (
    e: React.MouseEvent<HTMLDivElement>,
    square: TSquare,
  ) => void;
  squares: TSquare[];
  revealBombs: boolean;
}

export const Grid: React.FC<IGridProps> = (props) => {
  const {
    gridSize,
    handleClickSquare,
    handleRightClickSquare,
    squares,
    revealBombs,
  } = props;

  return (
    <div className={`${classes.grid} ${classes[`size-${gridSize.cols}`]}`}>
      {squares.map((square, index) => (
        <Square
          isEmpty={square.isClicked}
          handleRightClick={(e) => handleRightClickSquare(e, square)}
          handleClick={() => handleClickSquare(square)}
          nearBombs={square.nearBombs}
          key={index}
        >
          {square.isClicked && square.nearBombs !== 0 && square.nearBombs}
          {square.isFlagged && "F"}
          {revealBombs && square.isBomb && "B"}
        </Square>
      ))}
    </div>
  );
};
