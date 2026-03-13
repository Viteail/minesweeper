import { Square } from "../Square";
import classes from "./grid.module.css";

import type { TGrid, TSquare } from "../../App";

interface IGridProps {
  gridSize: TGrid;
  handleClickSquare: (arg0: TSquare) => void;
  squares: TSquare[];
}

export const Grid: React.FC<IGridProps> = (props) => {
  const { gridSize, handleClickSquare, squares } = props;

  return (
    <div className={`${classes.grid} ${classes[`size-${gridSize.cols}`]}`}>
      {squares.map((square, index) => (
        <Square handleClick={() => handleClickSquare(square)} key={index} />
      ))}
    </div>
  );
};
