import classes from "./menu.module.css";

import { Button } from "../Button";

import type { TGrid } from "../../App";

interface IMenuProps {
  handleClick: (value: TGrid) => void;
}

export const Menu: React.FC<IMenuProps> = (props) => {
  const { handleClick } = props;

  return (
    <div className={classes.menu}>
      <div>MineSweeper</div>
      <div>
        <Button onClick={() => handleClick({ cols: 8, rows: 8 })}>Easy</Button>
        <Button onClick={() => handleClick({ cols: 12, rows: 12 })}>
          Medium
        </Button>
        <Button onClick={() => handleClick({ cols: 20, rows: 20 })}>
          Hard
        </Button>
      </div>
    </div>
  );
};
