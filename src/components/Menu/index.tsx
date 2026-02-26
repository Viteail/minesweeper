import classes from "./menu.module.css";

import { Button } from "../Button";

interface IMenuProps {
  handleClick: (value: number) => void;
}

export const Menu: React.FC<IMenuProps> = (props) => {
  const { handleClick } = props;

  return (
    <div className={classes.menu}>
      <div>MineSweeper</div>
      <div>
        <Button onClick={() => handleClick(8)}>Easy</Button>
        <Button onClick={() => handleClick(12)}>Medium</Button>
        <Button onClick={() => handleClick(20)}>Hard</Button>
      </div>
    </div>
  );
};
