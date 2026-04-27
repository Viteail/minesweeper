import classes from "./grid.module.css";

import { Square } from "../Square";
import { Icon } from "../Icon";

import flagIcon from "../../assets/flag.svg";

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

  const renderContent = (square: TSquare) => {
    if (square.isClicked && square.nearBombs !== 0) return square.nearBombs;
    if (square.isFlagged) return <Icon src={flagIcon} alt="Flag" />;
    if (revealBombs && square.isBomb) return "B";
  };

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
          {renderContent(square)}
        </Square>
      ))}
    </div>
  );
};
