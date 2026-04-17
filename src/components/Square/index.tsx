import classes from "./square.module.css";

import { cn } from "../../utils/cn";

interface ISquareProps {
  handleClick: () => void;
  handleRightClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
  nearBombs: number;
  isEmpty: boolean;
}

const classesMap = new Map([
  [1, classes.one],
  [2, classes.two],
  [3, classes.three],
  [4, classes.four],
  [5, classes.five],
  [6, classes.six],
  [7, classes.seven],
  [8, classes.eight],
]);

export const Square: React.FC<ISquareProps> = (props) => {
  const { handleClick, handleRightClick, children, isEmpty, nearBombs } = props;

  return (
    <div
      className={cn(classes, [
        classes.square,
        `${isEmpty && classes.isEmpty}`,
        `${isEmpty && classesMap.get(nearBombs)}`,
      ])}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {children}
    </div>
  );
};
