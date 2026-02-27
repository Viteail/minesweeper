import classes from "./square.module.css";

interface ISquareProps {
  handleClick: () => void;
}

export const Square: React.FC<ISquareProps> = (props) => {
  const { handleClick} = props;
  return <div className={classes.square} onClick={handleClick}></div>;
};
