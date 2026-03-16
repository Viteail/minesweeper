import classes from "./square.module.css";

interface ISquareProps {
  handleClick: () => void;
  children: React.ReactNode;
  isEmpty: boolean;
}

export const Square: React.FC<ISquareProps> = (props) => {
  const { handleClick, children, isEmpty } = props;

  return (
    <div
      className={`${classes.square} ${isEmpty && classes.isEmpty}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
