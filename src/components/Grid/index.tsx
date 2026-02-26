import { Square } from "../Square";
import classes from "./grid.module.css";

interface IGridProps {
  size: number;
  handleClickSquare: () => void;
}

export const Grid: React.FC<IGridProps> = (props) => {
  const { size, handleClickSquare } = props;

  const squares = Array.from({ length: size * size }, (_, index) => index);

  return (
    <div className={`${classes.grid} ${classes[`size-${size}`]}`}>
      {squares.map((squares, index) => (
        <Square handleClick={() => handleClickSquare()} key={index} />
      ))}
    </div>
  );
};
