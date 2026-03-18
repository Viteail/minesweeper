import classes from "./square.module.css";

interface ISquareProps {
  handleClick: () => void;
  handleRightClick: (arg0: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
  isEmpty: boolean;
}

export const Square: React.FC<ISquareProps> = (props) => {
  const { handleClick, handleRightClick, children, isEmpty } = props;

  return (
    <div
      className={`${classes.square} ${isEmpty && classes.isEmpty}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {children}
    </div>
  );
};
